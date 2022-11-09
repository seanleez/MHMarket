import React from 'react';
import { Stage, Layer, Star, Text, Rect } from 'react-konva';
import Rectangle from './Rectangle';

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: 0,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const Canvas: React.FC = () => {
  const [rects, setRects] = React.useState(INITIAL_STATE);

  const handleDragStart = (e: any) => {
    console.dir(e.target);
    const id = e.target.id();
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
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Try to drag a star" />
        {rects.map((rect) => (
          <Rectangle
            rect={rect}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
