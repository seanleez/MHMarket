import React from 'react';
import { Layer, Stage, Text } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Rectangle from './Rectangle';

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: uuid(),
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
