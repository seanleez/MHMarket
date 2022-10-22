import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ListIcon from '../../assets/icon/list-icon.svg';
import { STATE_VALUES } from '../../const/const';

const UserForm = (props: any) => {
  const { errorMes, currentEditUser, userRoles, onSubmit } = props;

  const navigate = useNavigate();
  const isAtEditPage = location.pathname.includes('/user/edit');

  return (
    <>
      <span className="title">
        {isAtEditPage ? 'EDIT MARKET USER' : 'ADD NEW USER'}
      </span>
      <form onSubmit={onSubmit}>
        <div className="section-title">INFORMATION</div>
        <Box>
          {isAtEditPage && (
            <TextField
              disabled
              name="user_id"
              label="User ID"
              variant="outlined"
              error={!!errorMes}
              helperText={errorMes}
              defaultValue={currentEditUser?.user_id ?? ''}
              sx={{ mr: 1 }}
            />
          )}
          <TextField
            required
            select
            name="status"
            label="Status"
            defaultValue={currentEditUser?.status ?? ''}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Divider sx={{ my: '30px' }} />
        <TextField
          required
          name="email"
          label="Email Address"
          variant="outlined"
          defaultValue={currentEditUser?.email ?? ''}
        />
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mt: '30px' }}>
          <TextField
            required
            name="last_name"
            label="Last Name"
            variant="outlined"
            defaultValue={currentEditUser?.last_name ?? ''}
          />
          <TextField
            required
            name="first_name"
            label="First Name"
            variant="outlined"
            defaultValue={currentEditUser?.first_name ?? ''}
          />
          <TextField
            name="middle_name"
            label="Middle Name"
            variant="outlined"
            defaultValue={currentEditUser?.middle_name ?? ''}
          />
        </Box>
        <Divider sx={{ my: '30px' }} />
        <Box sx={{ display: 'flex' }}>
          <Box className="checkbox-group" sx={{ width: '50%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={ListIcon} alt={ListIcon} />
              <Typography>User Roles</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
              {userRoles.map((roles: any) => {
                const { name, role_id } = roles;
                return (
                  <FormControlLabel
                    key={role_id}
                    label={name}
                    control={
                      <Checkbox
                        id={role_id}
                        defaultChecked={currentEditUser?.role_ids.includes(
                          role_id
                        )}
                      />
                    }
                  />
                );
              })}
            </Box>
          </Box>
          {/* <TextField
            disabled
            name="market_name"
            label="Market Name"
            variant="outlined"
          /> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            mt: 4,
          }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/user-management')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" size="large">
            {isAtEditPage ? 'EDIT USER' : 'CREATE USER'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default UserForm;
