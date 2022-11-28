import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InvalidPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
      }}>
      <Typography
        sx={{
          fontSize: '70px',
          fontWeight: '700',
          lineHeight: '150px',
          color: '#0038a8',
        }}>
        404
      </Typography>
      <Typography
        sx={{ lineHeight: '50px', fontSize: '20px', color: '#0038a8' }}>
        The page could not be found !
      </Typography>
      <Button
        variant="contained"
        sx={{
          padding: '15px 40px',
          fontSize: '18px',
          borderRadius: '30px',
          bgcolor: '#0038a8',
          ':hover': {
            bgcolor: '#0038a8',
          },
        }}
        onClick={() => navigate('/home')}>
        Go to homepage
      </Button>
    </Box>
  );
};

export default InvalidPage;
