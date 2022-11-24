import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

interface ISelectSearch {
  onChangeSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MARKET_LEASE_SEARCH_FIELDS = [
  {
    value: 'lease_code',
    label: 'Lease ID',
  },
  {
    value: 'market_name',
    label: 'Market Name',
  },
  {
    value: 'first_name',
    label: 'First Name',
  },
  {
    value: 'last_name',
    label: 'Last Name',
  },
];

const SelectSearch: React.FC<ISelectSearch> = ({
  onChangeSelect,
  onChangeInput,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '175px',
        left: '130px',
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
          defaultValue={MARKET_LEASE_SEARCH_FIELDS[0].value}
          sx={{ minWidth: '150px', backgroundColor: 'white' }}
          onChange={onChangeSelect}>
          {MARKET_LEASE_SEARCH_FIELDS.map((option: any) => (
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
