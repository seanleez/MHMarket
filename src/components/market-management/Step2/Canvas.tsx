import { Box, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Layer, Stage, Image } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Rectangle from './Rectangle';
import AddNewShape from '../../../assets/icon/add-new-shape-icon.svg';
import useImage from 'use-image';

const SCROLL_BAR_WIDTH = 15;
const CANVAS_WIDTH = 0.9 * window.innerWidth - SCROLL_BAR_WIDTH;
const CANVAS_HEIGHT = window.innerHeight;

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: uuid(),
    x: Math.random() * CANVAS_WIDTH,
    y: Math.random() * CANVAS_HEIGHT,
    rotation: 0,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const LionImage = () => {
  const [image] = useImage('https://konvajs.org/assets/lion.png');
  return <Image image={image} />;
};

const Canvas: React.FC = () => {
  const [rects, setRects] = useState(INITIAL_STATE);

  useEffect(() => {
    console.log(window.innerWidth);
    console.log(window.innerWidth * 0.9);
  }, []);

  const handleDragStart = (e: any) => {
    console.dir(e.target);
    const id = e.target.id();
    console.log(id);
    setRects(
      rects.map((rect) => {
        return {
          ...rect,
          isDragging: rect.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e: any) => {
    setRects(
      rects.map((rect) => {
        return {
          ...rect,
          isDragging: false,
        };
      })
    );
  };

  return (
    <>
      <Box sx={{ backgroundColor: 'gray' }}>
        <IconButton>
          <img src={AddNewShape} alt={AddNewShape} />
        </IconButton>
      </Box>
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Layer style={{ border: '1px solid black' }}>
          <LionImage />
          {rects.map((rect: any, i: number) => (
            <Rectangle
              key={i}
              rect={rect}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default Canvas;
