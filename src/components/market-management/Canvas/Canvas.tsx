import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import { v4 as uuid } from 'uuid';
import AddNewShape from '../../../assets/icon/add-new-shape-icon.svg';
import DeleteStall from '../../../assets/icon/delete-stall-icon.svg';
import ConfirmDialog from '../../common/dialog/ConfirmDialog';
import Rectangle from './Rectangle';
import StallDetailDialog from './StallDetailDialog';

const SCROLL_BAR_WIDTH = 15;
const CONTAINER_WIDTH = 0.9 * window.innerWidth - SCROLL_BAR_WIDTH;
const CONTAINER_HEIGHT = 0.7 * window.innerHeight;

interface IRect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ICanvas {
  imgBackground: string;
}

const Canvas: React.FC<ICanvas> = (props) => {
  const { imgBackground } = props;
  const [rects, setRects] = useState<IRect[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);
  const [image, status] = useImage(imgBackground ?? '');

  const imageRef = useRef(null);

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
    const newRects = [...rects];
    const Rect = {
      id: uuid(),
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    };
    newRects.push(Rect);
    setRects(newRects);
  };

  const handleDeleteStall = () => {
    if (rects.length > 0) {
      setOpenConfirmDialog(true);
    }
  };

  const handleAcceptConfirmDialog = () => {
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

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#0038a8',
          display: 'flex',
          justifyContent: 'center',
          padding: '5px 0',
        }}>
        <Tooltip title={'Create Stall'}>
          <IconButton onClick={handleAddNewStall}>
            <img src={AddNewShape} alt={AddNewShape} />
          </IconButton>
        </Tooltip>
        <Tooltip title={'Delete Stall'}>
          <IconButton onClick={handleDeleteStall}>
            <img src={DeleteStall} alt={DeleteStall} />
          </IconButton>
        </Tooltip>
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
        onAcceptDialog={handleAcceptConfirmDialog}
      />
    </>
  );
};

export default Canvas;
