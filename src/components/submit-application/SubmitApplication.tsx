import { Box, Menu, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { rootURL } from '../../const/const';
import MarketInformation from './MarketInformation';

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const SubmitApplication: React.FC = () => {
  const [listPublicMarkets, setListPublicMarkets] = useState([]);
  const [selectedMarketId, setSelectedMarketId] = useState<string>('');
  const [floorplanDetail, setFloorplanDetail] = useState();

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
          console.log(response.items);
          setListPublicMarkets(response.items ?? []);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!selectedMarketId) return;
    fetch(`${rootURL}/markets/${selectedMarketId}/stalls/count`, {
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
          setFloorplanDetail(response);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedMarketId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMarketId(e.target.value);
  };

  return (
    <div className="container min-h-500">
      <span className="title">NEW STALL APPLICATION</span>
      <div className="section-title">PUBLIC MARKET INFORMATION</div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          component={'span'}
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
          }}>
          Public Market:{' '}
        </Typography>
        <TextField
          required
          select
          size="small"
          variant="outlined"
          sx={{ marginLeft: '20px', width: '20%' }}
          defaultValue={''}
          onChange={handleChange}>
          {<MenuItem value={undefined} sx={{ display: 'none' }}></MenuItem>}
          {listPublicMarkets.map((item: any, index: number) => (
            <MenuItem key={index} value={item.market_id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {selectedMarketId && (
        <MarketInformation
          market={listPublicMarkets.find(
            (market: any) => market.market_id === selectedMarketId
          )}
          floorplanDetail={floorplanDetail}
        />
      )}
    </div>
  );
};

export default SubmitApplication;
