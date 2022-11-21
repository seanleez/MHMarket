import { Box, Divider, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
interface IMarketInformation {
  market: any;
  floorplanDetail: any;
  supervisorInfor: any;
}

const MarketInformation: React.FC<IMarketInformation> = ({
  market,
  floorplanDetail,
  supervisorInfor,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        margin: '30px 30px 0',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
      <Box
        sx={{
          width: '45%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '20px',
        }}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            color: '#0f4c81',
          }}>
          <LocationOnIcon sx={{ margin: '0 5px 0 -15px' }} />
          Address
        </Typography>
        <Divider />
        <Typography>City : {market?.location?.city}</Typography>
        <Typography>Province : {market?.location?.province}</Typography>
        <Typography>District : {market?.location?.district}</Typography>
        <Typography>Street : {market?.location?.address}</Typography>
        <Typography>Zipcode : {market?.location?.zipcode}</Typography>
        <Typography>Map location : {market?.full_address}</Typography>
      </Box>

      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            color: '#0f4c81',
          }}>
          <PermContactCalendarIcon sx={{ margin: '0 5px 0 -15px' }} />
          Contact Person:
        </Typography>
        <Divider />
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
            <Typography>First Name : {supervisorInfor?.first_name}</Typography>
            <Typography>Middle Name: {supervisorInfor?.middle_name}</Typography>
            <Typography>Last Name : {supervisorInfor?.last_name}</Typography>
          </Box>
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
            <Typography>Position: {supervisorInfor?.position}</Typography>
            <Typography>Tel No.: {supervisorInfor?.telephone}</Typography>
            <Typography>
              Mobile No. : {supervisorInfor?.mobile_phone}
            </Typography>
            <Typography>Email Address : {supervisorInfor?.email}</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '45%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            color: '#0f4c81',
          }}>
          <InfoIcon sx={{ margin: '0 5px 0 -15px' }} />
          Floorplan Detail :
        </Typography>
        <Divider />

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
