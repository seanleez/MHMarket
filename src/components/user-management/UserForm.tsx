import {
  TextField,
  MenuItem,
  Divider,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Container,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ListIcon from '../../assets/icon/list-icon.svg';

const UserForm = (props: any) => {
  const { stateValues, errorMes, pmsCategories, currentEditRole, onSubmit } =
    props;

  const navigate = useNavigate();
  const isAtEditPage = location.pathname.includes('/role/edit');

  return (
    <>
      <span className="title">
        {isAtEditPage ? 'EDIT ROLE' : 'ADD NEW ROLE'}
      </span>
      <form onSubmit={onSubmit}>
        <div className="section-title">INFORMATION</div>
        <div className="information-fields">
          <TextField
            required
            name="name"
            label="RoleName"
            variant="outlined"
            error={!!errorMes}
            helperText={errorMes}
            defaultValue={currentEditRole?.name ?? ''}
            sx={{ width: '50%' }}
          />
          <TextField
            required
            select
            name="status"
            label="Status"
            defaultValue={currentEditRole?.status ?? ''}
            sx={{ m: 1, width: '30%' }}>
            {stateValues.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          required
          fullWidth
          name="description"
          label="Description"
          variant="outlined"
          defaultValue={currentEditRole?.description ?? ''}
        />
        <Divider sx={{ my: '30px' }} />
        <div className="section-title">PERMISSIONS</div>

        {pmsCategories.map((category: any) => (
          <div key={category.permission_category_id} className="checkbox-group">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={ListIcon} alt={ListIcon} />
              <Typography>{category.name}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
              {category.permissions.map((permission: any) => {
                const { permission_id, name } = permission;
                return (
                  <FormControlLabel
                    key={permission_id}
                    label={name}
                    control={
                      <Checkbox
                        id={permission_id}
                        defaultChecked={currentEditRole?.permission_ids.includes(
                          permission_id
                        )}
                      />
                    }
                  />
                );
              })}
            </Box>
          </div>
        ))}
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

export default UserForm;
