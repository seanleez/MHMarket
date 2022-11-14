import { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
interface IRectangle {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
  onDoubleClickStall: () => void;
}

const Rectangle: React.FC<IRectangle> = (props) => {
  const { shapeProps, isSelected, onSelect, onChange, onDoubleClickStall } =
    props;
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
      ...shapeProps,
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
    console.log(node);
    const scaleX = (node as any).scaleX();
    const scaleY = (node as any).scaleY();

    // we will reset it back
    (node as any).scaleX(1);
    (node as any).scaleY(1);
    onChange({
      ...shapeProps,
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
        {...shapeProps}
        opacity={0.8}
        fill="red"
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
