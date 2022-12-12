import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

interface ISelectSearch {
  searchFields: any;
  onChangeSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectSearch: React.FC<ISelectSearch> = ({
  searchFields,
  onChangeSelect,
  onChangeInput,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '170px',
        left: '150px',
        zIndex: '999',
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography variant="h6" fontWeight={'bold'}>
          Search:
        </Typography>
        <TextField
          required
          select
          size="small"
          name="stall_class"
          variant="outlined"
          defaultValue={searchFields[0].value}
          sx={{ minWidth: '150px', backgroundColor: 'white' }}
          onChange={onChangeSelect}>
          {searchFields.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          size="small"
          name="area"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start" sx={{ padding: '0 5px' }}>
                <SearchIcon />
              </InputAdornment>
            ),
            style: { padding: 0 },
          }}
          sx={{ width: '150%', backgroundColor: 'white' }}
          onChange={onChangeInput}
        />
      </Box>
    </Box>
  );
};

export default SelectSearch;
