import { Box, Modal, Typography } from '@mui/material';
import { useState } from 'react';

interface IImagePopupPreview {
  title: string;
  imgUrl: string;
  imgName: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  width: '600px',
  height: '400px',
  boxShadow: 24,
  borderRadius: '10px',
};

const ImagePopupPreview: React.FC<IImagePopupPreview> = ({
  title,
  imgUrl,
  imgName,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        width: '100%',
        p: '10px 0',
        textAlign: 'center',
        bgcolor: '#E9EBF5',
        borderRadius: '10px',
        minHeight: '180px',
      }}>
      <Typography variant="subtitle1">{title}</Typography>
      <img
        src={imgUrl}
        alt="image"
        style={{
          width: '150px',
          height: '120px',
          objectFit: 'contain',
          cursor: 'pointer',
          borderRadius: '10px',
        }}
        onClick={handleOpen}
      />
      <Typography variant="subtitle1">{imgName}</Typography>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <img
            src={imgUrl}
            alt="image"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};
export default ImagePopupPreview;
