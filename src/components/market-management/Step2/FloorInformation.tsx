import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  TextField,
} from '@mui/material';
import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import DeleteIcon from '../../../assets/icon/delete-icon.svg';
import EditIcon from '../../../assets/icon/edit-icon.svg';
import { rootURL } from '../../../const/const';
import { FloorContext } from '../../../context/FloorContext';
import ConfirmDialog from '../../common/dialog/ConfirmDialog';
import ErrorDialog from '../../common/dialog/ErrorDialog';
import CircularLoading from '../../common/loading/CircularLoading';
import Canvas from '../Canvas/Canvas';

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const marketId = localStorage.getItem('marketId');

const FloorInformation: React.FC<any> = (props) => {
  const { floor, columns, displayMode } = props;
  const [listStalls, setListStalls] = useState([]);
  const [isDisplayMode, setIsDisplayMode] = useState<boolean>(displayMode);
  const [expand, setExpand] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);

  const payload = useRef<any>({});
  const floorContext = useContext(FloorContext);
  const params = useParams();
  const getContent = (column: any) => {
    switch (column.id) {
      case 'action':
        return (
          <Box>
            <IconButton onClick={() => setIsDisplayMode(false)}>
              <img src={EditIcon} alt={EditIcon} />
            </IconButton>
            <IconButton onClick={() => setOpenConfirmDialog(true)}>
              <img src={DeleteIcon} alt={DeleteIcon} />
            </IconButton>
          </Box>
        );
      case 'expand':
        return (
          <IconButton onClick={handleExpandCollapse}>
            <ExpandMoreIcon
              style={expand ? { transform: 'scale(1,-1)' } : {}}
            />
          </IconButton>
        );
      default:
        return floor[`${column.id}`];
    }
  };

  const updateListStalls = () => {
    fetch(`${rootURL}/floors/${floor.floorplan_id}?draft=true`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error_code) {
          throw new Error(response.error_description);
        } else {
          if (response && response.stalls) {
            console.log(response);
            setListStalls(response.stalls);
          }
        }
      })
      .catch((err) => console.error(err));
  };

  const handleExpandCollapse = () => {
    setExpand((prev) => !prev);
    if (expand === false) {
      updateListStalls();
    }
  };

  const handleDeleteFloor = () => {
    setOpenConfirmDialog(false);
    fetch(`${rootURL}/floors/${floor.floorplan_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        floorContext.updateListFloors();
      })
      .catch((err) => setOpenErrorDialog(true));
  };

  const handleUpdateFloor = (e: FormEvent) => {
    e.preventDefault();

    payload.current['market_id'] = marketId;
    payload.current['floorplan_id'] = floor?.floorplan_id;

    const elementsInForm = (e.target as HTMLFormElement).elements;
    [...elementsInForm].forEach((el) => {
      if (el.nodeName === 'INPUT') {
        const { type, name, value, files } = el as HTMLInputElement;
        if (type === 'text') {
          payload.current[name] = value;
        }
        if (type === 'file' && files?.length === 0) {
          payload.current['image_name'] = floor?.image_name;
          payload.current['image_url'] = floor?.image_url;
        }
      }
    });

    fetch(`${rootURL}/floors/${floor.floorplan_id}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload.current),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error_code) {
          // setErrorMes(response.error_description);
          console.log(response);
        } else {
          floorContext.updateListFloors();
        }
      })
      .catch((err) => console.error(err));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData = new FormData();
    // @ts-ignore
    imageData.append('attachment', e.target.files?.[0]);

    setLoading(true);
    fetch(`${rootURL}/files/upload`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
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
          payload.current['image_name'] = response?.content;
          payload.current['image_url'] = response?.pre_signed_url;
          console.log(payload.current);
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box sx={{ marginBottom: '10px' }}>
      <form
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid gray',
          padding: '10px 0',
          minHeight: '30px',
        }}
        onSubmit={handleUpdateFloor}>
        {isDisplayMode ? (
          <>
            {columns.map((column: any, i: number) => {
              return (
                <Box
                  key={i}
                  style={{ width: column.width, textAlign: column.align }}
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                />
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
          <Canvas
            imgBackground={floor.image_url}
            floorId={floor.floorplan_id}
            listStalls={listStalls}
            updateListStalls={updateListStalls}
          />
        </Paper>
      </Collapse>
      <CircularLoading loading={loading} />
      <ConfirmDialog
        openProp={openConfirmDialog}
        message={'Are you sure you wanna delete this floor?'}
        onAcceptDialog={handleDeleteFloor}
        onCloseDialog={() => setOpenConfirmDialog(false)}
      />
      <ErrorDialog
        openProp={openErrorDialog}
        message={'Something went wrong!'}
        onCloseDialog={() => setOpenErrorDialog(false)}
      />
    </Box>
  );
};

export default FloorInformation;
