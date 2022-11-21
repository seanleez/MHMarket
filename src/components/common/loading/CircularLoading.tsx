import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

interface ICircularLoading {
  loading: boolean;
}

function FacebookCircularProgress(props: CircularProgressProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={50}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={50}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

const CircularLoading: React.FC<ICircularLoading> = (props) => {
  const { loading } = props;

  return (
    <div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <FacebookCircularProgress />
      </Backdrop>
    </div>
  );
};

export default CircularLoading;
