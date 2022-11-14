import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import { v4 as uuid } from 'uuid';
import AddNewShape from '../../../assets/icon/add-new-stall-icon.svg';
import DeleteStall from '../../../assets/icon/delete-stall-icon.svg';
import DragArrow from '../../../assets/icon/draggable-arrow-icon.svg';
import { rootURL } from '../../../const/const';
import ConfirmDialog from '../../common/dialog/ConfirmDialog';
import Rectangle from './Rectangle';
import StallDetailDialog from './StallDetailDialog';
import { useSnackbar } from 'notistack';

const SCROLL_BAR_WIDTH = 15;
const CONTAINER_WIDTH = 0.9 * window.innerWidth - SCROLL_BAR_WIDTH;
const CONTAINER_HEIGHT = 0.7 * window.innerHeight;

interface IRect {
  id: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  draggable: boolean;
}

interface ICanvas {
  imgBackground: string;
  floorId: string;
}

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const Canvas: React.FC<ICanvas> = (props) => {
  const { imgBackground, floorId } = props;
  const [rects, setRects] = useState<IRect[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const [image, status] = useImage(imgBackground ?? '');

  const imageRef = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const imgEl = (imageRef.current as any).getAttrs()?.image;
    if (status === 'loaded') {
      setCanvasWidth(imgEl?.width);
      setCanvasHeight(imgEl?.height);
    }
  }, [status]);

  useEffect(() => {
    console.log(rects);
  }, [rects]);

  const handleChange = (rect: IRect, newAttrs: any) => {
    const newRects = [...rects];
    const changingRectId = newRects.findIndex((item) => item.id === rect.id);
    if (changingRectId !== undefined) {
      newRects[changingRectId] = newAttrs;
      setRects(newRects);
    }
  };
  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target.getClassName() === 'Image';
    if (clickedOnEmpty) {
      setSelectedId('');
    }
  };

  const handleAddNewStall = () => {
    const payload = {
      x: 0,
      y: 0,
      rotation: 0,
      width: 100,
      height: 100,
    } as any;

    const newRects = [...rects];
    const Rect = {
      id: uuid(),
      ...payload,
      draggable: isDraggable,
    };
    newRects.push(Rect);
    setRects(newRects);

    payload['floorplan_id'] = floorId;

    // Call API create stall
    fetch(`${rootURL}/stalls`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error_code) {
          enqueueSnackbar(response.error_description, { variant: 'error' });
        } else {
          enqueueSnackbar('Successfully add new stall', { variant: 'success' });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };

  const handleOpenConfirmDialog = () => {
    if (rects.length > 0) {
      setOpenConfirmDialog(true);
    }
  };

  const handleDeleteStall = () => {
    const newRects = [...rects];
    setRects(newRects.filter((rect: IRect) => rect.id !== selectedId));
    setOpenConfirmDialog(false);
  };

  const handleDblClickStall = (id: string) => {
    console.log(id);
    setOpenDetailDialog(true);
  };

  const handleEditDetailStall = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {};
    const elementsInForm = (e.target as HTMLFormElement).elements;
    [...elementsInForm].forEach((el) => {
      if (el.nodeName === 'INPUT') {
        const { type, name, value } = el as HTMLInputElement;
        if (type === 'text') {
          payload[name] = value;
        }
        if (name !== 'name') {
          payload[name] = Number(value);
        }
      }
    });
    payload['stall_id'] = selectedId;
    console.log(payload);
  };

  const toggleDragMode = () => {
    setIsDraggable((prev) => !prev);
    if (rects.length > 0) {
      const newRects = rects.map((rect: IRect) => {
        return {
          ...rect,
          draggable: !rect.draggable,
        };
      });
      setRects(newRects);
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#0038a8',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '10px 30px',
        }}>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Tooltip title={`${isDraggable ? 'Drag Mode On' : 'Drag Mode Off'}`}>
            <IconButton
              onClick={toggleDragMode}
              sx={{
                backgroundColor: `${isDraggable ? 'black' : '#0038a8'}`,
                '&:hover': {
                  backgroundColor: `${isDraggable ? 'black' : '#0038a8'}`,
                },
              }}>
              <img src={DragArrow} alt={DragArrow} />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Create Stall'}>
            <IconButton onClick={handleAddNewStall}>
              <img src={AddNewShape} alt={AddNewShape} />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Delete Stall'}>
            <IconButton onClick={handleOpenConfirmDialog}>
              <img src={DeleteStall} alt={DeleteStall} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: 'white' }}>
            {rects.length > 0 ? `There has ${rects.length} stall(s)` : ''}
          </Typography>
        </Box>
      </Box>
      <div
        style={{
          width: CONTAINER_WIDTH,
          height: CONTAINER_HEIGHT,
          overflow: 'auto',
        }}>
        <Stage
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}>
          <Layer>
            <Image image={image} ref={imageRef} />
            {rects.length > 0 &&
              rects.map((rect: IRect) => (
                <Rectangle
                  key={rect.id}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    setSelectedId(rect.id);
                  }}
                  onChange={(newAttrs) => handleChange(rect, newAttrs)}
                  onDoubleClickStall={() => handleDblClickStall(rect.id)}
                />
              ))}
          </Layer>
        </Stage>
      </div>
      <StallDetailDialog
        openProp={openDetailDialog}
        onCloseDialog={() => setOpenDetailDialog(false)}
        onSubmit={handleEditDetailStall}
      />
      <ConfirmDialog
        openProp={openConfirmDialog}
        message={'Are you sure you wanna delete?'}
        onCloseDialog={() => setOpenConfirmDialog(false)}
        onAcceptDialog={handleDeleteStall}
      />
    </>
  );
};

export default Canvas;
