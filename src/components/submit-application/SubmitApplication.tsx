import StoreIcon from '@mui/icons-material/Store';
import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { useContext, useLayoutEffect, useState } from 'react';
import { rootURL } from '../../const/const';
import { ContainerContext } from '../../context/ContainerRefContext';
import MarketFloors from './MarketFloors';
import MarketInformation from './MarketInformation';

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const SubmitApplication: React.FC = () => {
  const [listPublicMarkets, setListPublicMarkets] = useState([]);
  const [selectedMarketId, setSelectedMarketId] = useState<string>('');
  const [floorplanDetail, setFloorplanDetail] = useState();
  const [supervisorInfor, setSupervisorInfor] = useState();
  const [listFloors, setListFloors] = useState([]);

  const containerContext = useContext(ContainerContext);

  useLayoutEffect(() => {
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
          setListPublicMarkets(response.items ?? []);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
    if (!selectedMarketId) return;
    fetch(`${rootURL}/markets/${selectedMarketId}?draft=false`, {
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
          setSupervisorInfor(response?.supervisor);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedMarketId]);

  useLayoutEffect(() => {
    if (!selectedMarketId) return;
    fetch(`${rootURL}/markets/${selectedMarketId}/floors/published`, {
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
          setListFloors(response?.floors ?? []);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedMarketId]);

  const handleChangeMarket = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMarketId(e.target.value);
  };

  return (
    <div className="container min-h-500" ref={containerContext.containerRef}>
      <span className="title">NEW STALL APPLICATION</span>
      <div className="section-title">PUBLIC MARKET INFORMATION</div>
      <Box sx={{ display: 'flex' }}>
        <Typography
          component={'span'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#0f4c81',
          }}>
          <StoreIcon
            sx={{ width: '35px', height: '35px', marginRight: '5px' }}
          />
          Public Market:
        </Typography>
        <TextField
          select
          size="small"
          variant="outlined"
          sx={{ marginLeft: '20px', width: '20%' }}
          defaultValue={''}
          onChange={handleChangeMarket}>
          {<MenuItem value={undefined} sx={{ display: 'none' }}></MenuItem>}
          {listPublicMarkets.map((item: any, index: number) => (
            <MenuItem key={index} value={item.market_id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {selectedMarketId && (
        <>
          <MarketInformation
            market={listPublicMarkets.find(
              (market: any) => market.market_id === selectedMarketId
            )}
            floorplanDetail={floorplanDetail}
            supervisorInfor={supervisorInfor}
          />

          <div className="section-title">MARKET FLOORS & STALLS</div>
          <MarketFloors listFloors={listFloors} />
        </>
      )}
    </div>
  );
};

export default SubmitApplication;
