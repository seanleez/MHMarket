import { Rect } from 'react-konva';

interface IRectangle {
  rect: any;
  onDragStart: (e: any) => void;
  onDragEnd: (e: any) => void;
}

const Rectangle: React.FC<IRectangle> = (props) => {
  const { rect, onDragStart, onDragEnd } = props;
  return (
    <Rect
      id={rect.id}
      x={rect.x}
      y={rect.y}
      width={100}
      height={100}
      fill="#89b717"
      opacity={0.8}
      draggable
      rotation={rect.rotation}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
};

export default Rectangle;
