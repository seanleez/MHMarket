import { Box, IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import AddNewShape from '../../../assets/icon/add-new-stall-icon.svg';
import DeleteStall from '../../../assets/icon/delete-stall-icon.svg';
import DragArrow from '../../../assets/icon/draggable-arrow-icon.svg';
import { CONTAINER_HEIGHT, CONTAINER_WIDTH } from '../../../const/const';
import { FloorContext } from '../../../context/FloorContext';
import stallApis from '../../../services/stallApis';
import ConfirmDialog from '../../common/dialog/ConfirmDialog';
import SuccessDialog from '../../common/dialog/SuccessDialog';
import Rectangle from './Rectangle';
import StallDetailDialog from './StallDetailDialog';

interface ICanvas {
  imgBackground: string;
  floorId: string;
  listStalls: any[];
  updateListStalls: () => void;
}

const Canvas: React.FC<ICanvas> = (props) => {
  const { imgBackground, floorId, listStalls, updateListStalls } = props;
  const [stalls, setStalls] = useState(listStalls);
  const [selectedId, setSelectedId] = useState<string>('');
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const [image, status] = useImage(imgBackground ?? '');

  const imageRef = useRef(null);
  const floorContext = useContext(FloorContext);

  const { enqueueSnackbar } = useSnackbar();

  useLayoutEffect(() => {
    const imgEl = (imageRef.current as any).getAttrs()?.image;
    if (status === 'loaded') {
      setCanvasWidth(imgEl?.width);
      setCanvasHeight(imgEl?.height);
    }
  }, [status]);

  useLayoutEffect(() => {
    console.log(listStalls);
    setStalls(listStalls);
  }, [listStalls]);

  const handleChange = (newAttrs: any) => {
    const { stall_id, x, y, rotation, width, height } = newAttrs;
    const payload = {
      floorplan_id: floorId,
      ...{ stall_id, x, y, rotation, width, height },
    };

    const newRects = [...stalls];
    const changedRectIndex = newRects.findIndex(
      (item) => item.stall_id === stall_id
    );
    if (changedRectIndex !== undefined) {
      newRects[changedRectIndex] = newAttrs;
      setStalls(newRects);
    }

    (async () => {
      try {
        await stallApis.updateStall(stall_id, payload);
        enqueueSnackbar('Successfully update stall', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
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
      x: 100,
      y: 100,
      rotation: 0,
      width: 100,
      height: 100,
    } as any;

    payload['floorplan_id'] = floorId;

    // Call API create stall
    (async () => {
      try {
        const response = await stallApis.createStall(payload);
        const newRects = [...stalls];
        newRects.push(response);
        setStalls(newRects);
        floorContext.updateListFloors();
        enqueueSnackbar('Successfully add new stall', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  };

  const handleOpenConfirmDialog = () => {
    if (stalls.length > 0) {
      setOpenConfirmDialog(true);
    }
  };

  const handleDeleteStall = () => {
    setOpenConfirmDialog(false);
    (async () => {
      try {
        await stallApis.deleteStall(selectedId);
        const newRects = [...stalls];
        setStalls(newRects.filter((rect: any) => rect.stall_id !== selectedId));
        floorContext.updateListFloors();
        enqueueSnackbar('Successfully delete stall', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
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
        if (
          ['area', 'stall_class', 'stall_status', 'stall_type'].includes(name)
        ) {
          payload[name] = Number(value);
        }
      }
    });
    payload['stall_id'] = selectedId;

    (async () => {
      try {
        await stallApis.editDetailStall(selectedId, payload);
        setOpenSuccessDialog(true);
        floorContext.updateListFloors();
        updateListStalls();
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  };

  const toggleDragMode = () => {
    setIsDraggable((prev) => !prev);
    if (stalls.length > 0) {
      const newRects = stalls.map((rect: any) => {
        return {
          ...rect,
          draggable: !rect.draggable,
        };
      });
      setStalls(newRects);
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#0038a8',
          padding: '10px 20px',
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
            <Image image={image} ref={imageRef}/>
            {stalls.length > 0 &&
              stalls.map((stall: any) => (
                <Rectangle
                  key={stall.stall_id}
                  stall={stall}
                  draggable={isDraggable}
                  isSelected={stall.stall_id === selectedId}
                  onSelect={() => {
                    console.log(selectedId);
                    setSelectedId(stall.stall_id);
                  }}
                  onChange={handleChange}
                  onDoubleClickStall={() => setOpenDetailDialog(true)}
                />
              ))}
          </Layer>
        </Stage>
      </div>
      <StallDetailDialog
        stall={stalls.find((stall: any) => stall.stall_id === selectedId)}
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
      <SuccessDialog
        openProp={openSuccessDialog}
        message={'Successfully updated stall metadata'}
        onCloseDialog={() => {
          setOpenSuccessDialog(false);
          openDetailDialog && setOpenDetailDialog(false);
        }}
      />
    </>
  );
};

export default Canvas;
