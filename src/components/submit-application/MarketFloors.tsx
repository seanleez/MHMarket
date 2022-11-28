import { Box } from '@mui/material';
import FloorCanvas from './Canvas/FloorCanvas';

interface IMarketFloors {
  listFloors: any;
}

const MarketFloors: React.FC<IMarketFloors> = ({ listFloors }) => {
  return (
    <Box>
      {listFloors.map((floor: any) => (
        <FloorCanvas key={floor.floorplan_id} floor={floor} />
      ))}
    </Box>
  );
};

export default MarketFloors;
