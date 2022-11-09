import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  Paper,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

interface IAddNewFloorForm {
  onSubmit: () => void;
  onCancel: () => void;
}

const AddNewFloorForm: React.FC<IAddNewFloorForm> = (props) => {
  const [expand, setExpand] = useState<boolean>(false);
  const { onSubmit, onCancel } = props;
  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0',
          border: '1px solid gray',
          borderRadius: '5px',
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
          <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
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
        {/* <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button> */}
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button variant="contained" size="medium" type="submit">
              <AddIcon />
              Create Floor
            </Button>
            <Button variant="outlined" size="medium" onClick={onCancel}>
              Cancel
            </Button>
          </Box>
          <Button>
            <ExpandMoreIcon onClick={() => setExpand((prev) => !prev)} />
          </Button>
        </Box>
      </Box>

      <Collapse in={expand}>
        <Paper elevation={5}>111</Paper>
      </Collapse>
    </form>
  );
};
export default AddNewFloorForm;
