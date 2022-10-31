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
            gap: 2,
          }}>
          <TextField
            required
            name="name"
            label="Market Name"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
            style={{ width: '33%' }}
          />
          <TextField
            required
            select
            name="status"
            label="Status"
            defaultValue={currentEditMarket?.status ?? ''}
            style={{ width: '33%' }}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <div className="section-title">ADDRESS</div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextField
            required
            name="street"
            label="Street"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            required
            select
            name="province"
            label="Province"
            defaultValue={currentEditMarket?.status ?? ''}>
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
            defaultValue={currentEditMarket?.status ?? ''}>
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
            defaultValue={currentEditMarket?.status ?? ''}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '16px 0',
          }}>
          <TextField
            disabled
            name="zipcode"
            label="Zipcode"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            disabled
            name="district"
            label="District"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <Box sx={{ width: '49%' }} />
        </Box>
        <TextField
          fullWidth
          name="location"
          label="Map Location"
          variant="outlined"
          defaultValue={currentEditMarket?.name ?? ''}
          style={{ width: '100%' }}
        />
        <div className="section-title">CONTACT PERSON</div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '16px 0',
          }}>
          <TextField
            required
            name="firstName"
            label="First Name"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            name="middleName"
            label="Middle Name"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            required
            name="lastName"
            label="Last Name"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            required
            name="email"
            label="Email Address"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '16px 0',
          }}>
          <TextField
            name="position"
            label="Position"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            name="telNum"
            label="Telephone No."
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            name="mobileNum"
            label="Mobile No."
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <Box sx={{ width: '24%' }} />
        </Box>

        <div className="section-title">MARKET INFORMATION</div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '16px 0',
          }}>
          <TextField
            required
            select
            name="marketType"
            label="Market Type"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            select
            name="marketClass"
            label="MarketClass"
            defaultValue={currentEditMarket?.status ?? ''}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ width: '49%' }} />
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
