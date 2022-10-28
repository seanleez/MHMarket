import {
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { STATE_VALUES } from '../../const/const';

const MarketForm = (props: any) => {
  const { currentEditMarket, onSubmit } = props;

  const navigate = useNavigate();
  const isAtEditPage = location.pathname.includes('/role/edit');

  return (
    <>
      <span className="title">
        {isAtEditPage ? 'EDIT MARKET' : 'ADD NEW MARKET'}
      </span>
      <form onSubmit={onSubmit}>
        <div className="section-title">BASIC</div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <TextField
            required
            name="name"
            label="Market Name"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
            style={{ width: '50%', marginRight: 20 }}
          />
          <TextField
            required
            select
            name="status"
            label="Status"
            defaultValue={currentEditMarket?.status ?? ''}
            style={{ width: '30%' }}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Divider sx={{ my: '30px' }} />

        <div className="section-title">ADDRESS</div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <TextField
            required
            name="street"
            label="Street"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
            style={{ width: '25%' }}
          />
          <TextField
            required
            select
            name="province"
            label="Province"
            defaultValue={currentEditMarket?.status ?? ''}
            style={{ width: '25%' }}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            select
            name="city"
            label="City"
            defaultValue={currentEditMarket?.status ?? ''}
            style={{ width: '25%' }}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            select
            name="ward"
            label="Ward"
            defaultValue={currentEditMarket?.status ?? ''}
            style={{ width: '25%' }}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <TextField
            disabled
            name="zipcode"
            label="Zipcode"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
            style={{ width: '25%' }}
          />
          <TextField
            disabled
            name="district"
            label="District"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
            style={{ width: '25%' }}
          />
          <br />
          <TextField
            fullWidth
            name="location"
            label="Map Location"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
        </Box>

        <Divider sx={{ my: '30px' }} />

        <Container
          sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/role-management')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" size="large">
            {isAtEditPage ? 'EDIT ROLE' : 'CREATE ROLE'}
          </Button>
        </Container>
      </form>
    </>
  );
};

export default MarketForm;
