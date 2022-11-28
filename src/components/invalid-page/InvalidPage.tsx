import { Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorContext } from '../../context/AuthorContext';

const InvalidPage: React.FC = () => {
  const navigate = useNavigate();
  const authorContext = useContext(AuthorContext);
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
        onClick={() => {
          authorContext?.currentUser ? navigate('/home') : navigate('/');
        }}>
        {authorContext?.currentUser ? 'Go To Home Page' : 'Login'}
      </Button>
    </Box>
  );
};

export default InvalidPage;
