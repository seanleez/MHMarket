import { Box, Button, TextField } from '@mui/material';

interface IAddNewFloor {
  onCancel: () => void;
}

const AddNewFloor: React.FC<IAddNewFloor> = (props) => {
  const { onCancel } = props;
  return (
    <Box
      sx={{
        marginBottom: '10px',
        display: 'flex',
        border: '1px solid gray',
        padding: '10px 0',
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <TextField
            required
            name="floor_name"
            label="Floor Name"
            size="small"
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <input type="file" />
        </Box>
      </Box>
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Box sx={{ margin: 'auto 0' }}>
          <Button variant="contained" size="small" sx={{ marginRight: '10px' }}>
            Create Floor
          </Button>
          <Button variant="outlined" size="small" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewFloor;
