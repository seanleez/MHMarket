import {
  Box,
  Button,
  IconButton,
  TextField,
  Collapse,
  Paper,
} from '@mui/material';
import DeleteIcon from '../../../assets/icon/delete-icon.svg';
import EditIcon from '../../../assets/icon/edit-icon.svg';
import { useState } from 'react';
import Canvas from '../Canvas/Canvas';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FloorInformation: React.FC<any> = (props) => {
  const { floor, columns, displayMode } = props;
  const [isDisplayMode, setIsDisplayMode] = useState<boolean>(displayMode);
  const [expand, setExpand] = useState<boolean>(false);

  console.log(floor);

  const getContent = (column: any) => {
    switch (column.id) {
      case 'action':
        return (
          <Box>
            <IconButton onClick={() => setIsDisplayMode(false)}>
              <img src={EditIcon} alt={EditIcon} />
            </IconButton>
            <IconButton>
              <img src={DeleteIcon} alt={DeleteIcon} />
            </IconButton>
          </Box>
        );
      case 'expand':
        return (
          <IconButton onClick={() => setExpand((prev) => !prev)}>
            <ExpandMoreIcon
              style={expand ? { transform: 'scale(1,-1)' } : {}}
            />
          </IconButton>
        );
      default:
        return floor[`${column.id}`];
    }
  };

  return (
    <Box sx={{ marginBottom: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid gray',
          padding: '10px 0',
          margin: '10px 0',
          minHeight: '30px',
        }}>
        {isDisplayMode ? (
          <>
            {columns.map((column: any, i: number) => {
              return (
                <Box
                  key={i}
                  style={{ width: column.width, textAlign: column.align }}>
                  {getContent(column)}
                </Box>
              );
            })}
          </>
        ) : (
          <>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
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
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button variant="contained" size="small" type="submit">
                  Update Floor
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setIsDisplayMode(true)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Collapse in={expand}>
        <Paper elevation={5}>
          <Canvas imgBackground={floor.image_url} />
        </Paper>
      </Collapse>
    </Box>
  );
};

export default FloorInformation;
