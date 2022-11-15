import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface ICircularLoading {
  loading: boolean;
  message: string;
}

const CircularLoading: React.FC<ICircularLoading> = (props) => {
  const { loading, message } = props;

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress color="inherit" />
        <Typography sx={{ marginLeft: '10px' }}>{message}</Typography>
      </Backdrop>
    </div>
  );
};

export default CircularLoading;
