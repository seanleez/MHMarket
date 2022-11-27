import { Box, Button, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormEvent, useContext, useRef, useState } from 'react';
import { FloorContext } from '../../../context/FloorContext';
import floorApis from '../../../services/floorApis';
import CircularLoading from '../../common/loading/CircularLoading';

interface IAddNewFloor {
  onCancel: () => void;
}

const AddNewFloor: React.FC<IAddNewFloor> = (props) => {
  const { onCancel } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const payload = useRef<any>({});
  const floorContext = useContext(FloorContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData = new FormData();
    // @ts-ignore
    imageData.append('attachment', e.target.files?.[0]);

    setLoading(true);
    (async () => {
      try {
        const response = await floorApis.uploadFile(imageData);
        payload.current['image_name'] = (response as any)?.content;
        payload.current['image_url'] = (response as any)?.pre_signed_url;
        setLoading(false);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  };

  const handleCreateFloor = (e: FormEvent) => {
    e.preventDefault();
    onCancel();
    const marketId = localStorage.getItem('marketId') ?? '';
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

    (async () => {
      try {
        await floorApis.createFloor(payload.current);
        floorContext.updateListFloors();
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
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
      <CircularLoading loading={loading} />
    </form>
  );
};

export default AddNewFloor;
