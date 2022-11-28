import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef } from 'react';
import { Rect } from 'react-konva';

interface IRectangle {
  stall: any;
  isSelected: boolean;
  onSelect: () => void;
  onDoubleClickStall: (e: KonvaEventObject<MouseEvent>) => void;
}

const Rectangle: React.FC<IRectangle> = (props) => {
  const { stall, isSelected, onSelect, onDoubleClickStall } = props;
  const shapeRef = useRef(null);

  const SELECTED_PROPERTIES = {
    stroke: '#e9b666',
    strokeWidth: 3,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOpacity: 0.6,
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
        opacity={0.9}
        fill={
            stall?.is_updated_detail ? (stall?.lease_status ? '#ff4444' :  '#007e33'):'gray'
        }
        ref={shapeRef}
        {...(isSelected ? SELECTED_PROPERTIES : {})}
        onTap={onSelect}
        onClick={onSelect}
        onDblClick={onDoubleClickStall}
      />
    </>
  );
};

export default Rectangle;
