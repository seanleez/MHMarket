import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { rootURL } from '../../const/const';

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const SubmitApplication: React.FC = () => {
  const [listPublicMarkets, setListPublicMarkets] = useState([]);

  useEffect(() => {
    fetch(`${rootURL}/markets/published`, {
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
          console.log(response);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="container min-h-500">
      <span className="title">NEW STALL APPLICATION</span>
      <div className="section-title">PUBLIC MARKET INFORMATION</div>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component={'span'}>Public Market: </Typography>
          <TextField
            required
            select
            size="small"
            name="stall_type"
            variant="outlined"
            sx={{ marginLeft: '20px', width: '20%' }}>
            {listPublicMarkets.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </div>
  );
};

export default SubmitApplication;
