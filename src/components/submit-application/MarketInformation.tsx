import { Box, Typography } from '@mui/material';

interface IMarketInformation {
  market: any;
  floorplanDetail: any;
}

const MarketInformation: React.FC<IMarketInformation> = ({
  market,
  floorplanDetail,
}) => {
  return (
    <Box sx={{ display: 'flex', margin: '30px 20px 0', flexWrap: 'wrap' }}>
      <Box
        sx={{
          width: '45%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '20px',
        }}>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
          Address :
        </Typography>
        <Typography>City : {market?.location?.city}</Typography>
        <Typography>Province : {market?.location?.province}</Typography>
        <Typography>District : {market?.location?.district}</Typography>
        <Typography>Street : {market?.location?.address}</Typography>
        <Typography>Zipcode : {market?.location?.zipcode}</Typography>
        <Typography>Map location : {market?.full_address}</Typography>
      </Box>
      <Box sx={{ width: '55%' }}>2</Box>
      <Box
        sx={{
          width: '45%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
          Floorplan Detail :
        </Typography>
        <Typography>
          Total number of stalls : {floorplanDetail?.total_stalls}
        </Typography>
        <Typography>
          Total number of available stalls : {floorplanDetail?.available_stalls}
        </Typography>
        <Typography>
          Total number of occupied stalls : {floorplanDetail?.occupied_stalls}
        </Typography>
      </Box>
    </Box>
  );
};

export default MarketInformation;
