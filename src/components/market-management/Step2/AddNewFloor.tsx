import { Box, Button, TextField } from '@mui/material';
import { FormEvent, useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { rootURL } from '../../../const/const';
import { FloorContext } from '../../../context/FloorContext';
import SuccessDialog from '../../common/dialog/SuccessDialog';
import CircularLoading from '../../common/loading/CircularLoading';

interface IAddNewFloor {
  onCancel: () => void;
}
const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
const token = currentUser?.access_token;

const AddNewFloor: React.FC<IAddNewFloor> = (props) => {
  const { onCancel } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const payload = useRef<any>({});
  const floorContext = useContext(FloorContext);

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
          console.log(response);
        } else {
          payload.current['image_name'] = response?.content;
          payload.current['image_url'] = response?.pre_signed_url;
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCreateFloor = (e: FormEvent) => {
    e.preventDefault();
    const marketId = localStorage.getItem('marketId');
    payload.current['market_id'] = marketId;

    const elementsInForm = (e.target as HTMLFormElement).elements;
    [...elementsInForm].forEach((el) => {
      if (el.nodeName === 'INPUT') {
        const { type, name, value, files } = el as HTMLInputElement;
        if (type === 'text') {
          payload.current[name] = value;
        }
      }
    });

    console.log(payload);
    fetch(`${rootURL}/floors`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload.current),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error_code) {
          console.log(response);
        } else {
          fetch(`${rootURL}/markets/${marketId}/floors?draft=true`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data && data.floors) {
                floorContext.setListFloors(data.floors);
                onCancel();
              }
            });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <form
      style={{
        display: 'flex',
        border: '1px solid gray',
        padding: '10px 0',
      }}
      onSubmit={handleCreateFloor}>
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
          <input
            type="file"
            required
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
        <Box sx={{ margin: 'auto 0' }}>
          <Button
            variant="contained"
            size="small"
            sx={{ marginRight: '10px' }}
            type="submit">
            Create Floor
          </Button>
          <Button variant="outlined" size="small" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
      <CircularLoading loading={loading} message={'Loading File...'} />
    </form>
  );
};

export default AddNewFloor;
