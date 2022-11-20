import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { ContainerContext } from '../../../context/ContainerRefContext';

type TPosition = {
  x: number;
  y: number;
};

interface IStallInformation {
  position: TPosition;
}

const StallInformation: React.FC<IStallInformation> = ({ position }) => {
  const containerContext = useContext(ContainerContext);
  const clientRect =
    containerContext.containerRef.current?.getBoundingClientRect();
  console.log(window.scrollY);
  console.log(containerContext.containerRef.current?.getBoundingClientRect());
  return (
    <Box
      sx={{
        minWidth: 275,
        position: 'absolute',
        top: position.y - (clientRect?.y ?? 0),
        left: position.x - (clientRect?.x ?? 0),
      }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            benevolent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default StallInformation;
