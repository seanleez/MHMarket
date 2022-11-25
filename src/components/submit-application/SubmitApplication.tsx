import StoreIcon from '@mui/icons-material/Store';
import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useContext, useLayoutEffect, useState } from 'react';
import { rootURL } from '../../const/const';
import { ContainerContext } from '../../context/ContainerRefContext';
import submitAppApis from '../../services/submitAppApis';
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
  const { enqueueSnackbar } = useSnackbar();

  useLayoutEffect(() => {
    (async () => {
      try {
        const res = await submitAppApis.getPublishedMarkets();
        setListPublicMarkets((res as any).items ?? []);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  }, []);

  useLayoutEffect(() => {
    if (!selectedMarketId) return;
    (async () => {
      try {
        const res = await Promise.all([
          submitAppApis.getFloorDetail(selectedMarketId),
          submitAppApis.getMarket(selectedMarketId),
          submitAppApis.getPublishedMarket(selectedMarketId),
        ]);
        setFloorplanDetail((res[0] as any) ?? []);
        setSupervisorInfor((res[1] as any)?.supervisor);
        setListFloors((res[2] as any)?.floors ?? []);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
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
