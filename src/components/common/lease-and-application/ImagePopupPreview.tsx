import { Box, Modal, Typography } from '@mui/material';
import { useState } from 'react';

interface IImagePopupPreview {
  title?: string;
  imgUrl: string;
  imgName?: string;
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
        bgcolor: '#F0F0F0',
        borderRadius: '10px',
      }}>
      {title && (
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
      )}
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
      {imgName && <Typography variant="subtitle1">{imgName}</Typography>}
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
