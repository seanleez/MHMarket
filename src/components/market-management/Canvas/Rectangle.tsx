import { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import { CONTAINER_HEIGHT, CONTAINER_WIDTH } from '../../../const/const';

interface IRectangle {
  stall: any;
  isSelected: boolean;
  draggable: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
  onDoubleClickStall: () => void;
}

const Rectangle: React.FC<IRectangle> = (props) => {
  const {
    stall,
    isSelected,
    draggable,
    onSelect,
    onChange,
    onDoubleClickStall,
  } = props;
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      (trRef.current as any)?.nodes([shapeRef.current]);
      (trRef.current as any)?.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e: any) => {
    onChange({
      ...stall,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = (e: any) => {
    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const node = shapeRef.current;
    const scaleX = (node as any).scaleX();
    const scaleY = (node as any).scaleY();

    // we will reset it back
    (node as any).scaleX(1);
    (node as any).scaleY(1);
    onChange({
      ...stall,
      rotation: (node as any).rotation(),
      x: (node as any).x(),
      y: (node as any).y(),
      // set minimal value
      width: Math.max(5, (node as any).width() * scaleX),
      height: Math.max((node as any).height() * scaleY),
    });
  };

  return (
    <>
      <Rect
        id={stall?.stall_id}
        x={stall?.x}
        y={stall?.y}
        rotation={stall?.rotation}
        width={stall?.width}
        height={stall?.height}
        draggable={draggable}
        opacity={0.9}
        fill={stall.stall_name ? '#007e33' : '#ff4444'}
        ref={shapeRef}
        onTap={onSelect}
        onClick={onSelect}
        onDblClick={onDoubleClickStall}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Rectangle;
