import { Box, Button, Divider, MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './UserForm.scss';

const stateValues = [
  {
    value: 1,
    label: 'active',
  },
  {
    value: 0,
    label: 'inactive',
  },
];

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
          <TextField
            disabled
            label="User ID"
            variant="outlined"
            error={!!errorMes}
            helperText={errorMes}
            defaultValue={currentEditUser?.user_id ?? ''}
          />
          <TextField
            required
            select
            name="status"
            label="Status"
            defaultValue={currentEditUser?.status ?? ''}
            sx={{ mx: 1 }}>
            {stateValues.map((option: any) => (
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
            required
            name="middle_name"
            label="Middle Name"
            variant="outlined"
            defaultValue={currentEditUser?.middle_name ?? ''}
          />
        </Box>
        <Divider sx={{ my: '30px' }} />
        <Box sx={{ mt: '30px' }}>
          <TextField
            required
            select
            name="user_role"
            label="User Role"
            defaultValue={currentEditUser?.status ?? ''}>
            {userRoles.map((role: any) => (
              <MenuItem key={role.role_id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            select
            name="market_name"
            label="Market Name"
            defaultValue={currentEditUser?.status ?? ''}
            sx={{ mx: 1 }}>
            {stateValues.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
