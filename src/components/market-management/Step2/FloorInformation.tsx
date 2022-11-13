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
import { FormEvent, useContext, useState } from 'react';
import Canvas from '../Canvas/Canvas';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FloorContext } from '../../../context/FloorContext';
import { rootURL } from '../../../const/const';

const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
const token = currentUser?.access_token;

const updateImage = (imageData: FormData) => {
  fetch(`${rootURL}/files/upload`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      // @ts-ignore
      Authorization: `Bearer ${token}`,
    },
    body: imageData,
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.error_code) {
        // setErrorMes(response.error_description);
        console.log(response);
      } else {
        console.log(response);
        // setOpenSuccessDialog(true);
      }
    })
    .catch((err) => console.error(err));
};

const FloorInformation: React.FC<any> = (props) => {
  const { floor, columns, displayMode } = props;
  const [isDisplayMode, setIsDisplayMode] = useState<boolean>(displayMode);
  const [expand, setExpand] = useState<boolean>(false);

  const floorContext = useContext(FloorContext);

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

  const handleUpdateFloor = (e: FormEvent) => {
    console.log(floor);
    e.preventDefault();

    const payload: any = {};

    payload['market_id'] = localStorage.getItem('marketId');
    payload['floorplan_id'] = floor?.floorplan_id;
    payload['image_name'] = floor?.image_name;
    payload['image_url'] = floor?.image_url;

    const elementsInForm = (e.target as HTMLFormElement).elements;
    [...elementsInForm].forEach((el) => {
      if (el.nodeName === 'INPUT') {
        const { type, name, value, files } = el as HTMLInputElement;
        if (type === 'text') {
          payload[name] = value;
        }
        if (type === 'file') {
          if (files && files[0]) {
            const imageData = new FormData();
            // @ts-ignore
            imageData.append('attachment', files?.[0]);
            updateImage(imageData);
          }
        }
      }
    });

    console.log(payload);
  };

  return (
    <Box sx={{ marginBottom: '10px' }}>
      <form
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid gray',
          padding: '10px 0',
          margin: '10px 0',
          minHeight: '30px',
        }}
        onSubmit={handleUpdateFloor}>
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
                  defaultValue={floor.floor_name}
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
      </form>
      <Collapse in={expand}>
        <Paper elevation={5}>
          <Canvas imgBackground={floor.image_url} />
        </Paper>
      </Collapse>
    </Box>
  );
};

export default FloorInformation;
