import { Box, Divider, Typography } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { rootURL } from '../../const/const';

type TPair = {
  label: string;
  value: string | number;
  isDateField?: boolean;
};

const field = (pair: TPair) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="subtitle1" sx={{ minWidth: '150px' }}>
        {pair.label}
      </Typography>
      <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 'bold' }}>
        {pair.value}
      </Typography>
    </Box>
  );
};

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const ViewMarketLease: React.FC = () => {
  const [leaseInfor, setLeaseInfor] = useState([]);
  const params = useParams();

  useLayoutEffect(() => {
    console.log();
    fetch(`${rootURL}/applications/in-lease/${params.id}`, {
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
          setLeaseInfor(response ?? {});
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const labelValuePair: TPair[] = [
    { label: 'Search Id', value: 1 },
    { label: 'Stallholder Name', value: 1 },
    { label: 'Market Name', value: 1 },
    { label: 'Lease Start Date', value: 1 },
    { label: 'Stall Number', value: 1 },
    { label: 'Lease End Date', value: 1 },
  ];
  return (
    <div className="container">
      <span className="title">NEW STALL APPLICATION</span>

      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box sx={{ width: '33%' }}>
          {labelValuePair.slice(0, 2).map((pair: TPair) => field(pair))}
        </Box>
        <Box sx={{ width: '33%' }}>
          {labelValuePair.slice(2, 4).map((pair: TPair) => field(pair))}
        </Box>
        <Box sx={{ width: '33%' }}>
          {labelValuePair.slice(4, 6).map((pair: TPair) => field(pair))}
        </Box>
      </Box>

      <div className="section-title">PUBLIC MARKET INFORMATION</div>
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
            Address
          </Typography>
          <Divider />
          <Typography>City : </Typography>
          <Typography>Province :</Typography>
          <Typography>District : </Typography>
          <Typography>Street : </Typography>
          <Typography>Zipcode : </Typography>
          <Typography>Map location </Typography>
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
              <Typography>First Name :</Typography>
              <Typography>Middle Name:</Typography>
              <Typography>Last Name : </Typography>
            </Box>
            <Box
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
              <Typography>Position:</Typography>
              <Typography>Tel No.: </Typography>
              <Typography>Mobile No. :</Typography>
              <Typography>Email Address : </Typography>
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
            Floorplan Detail :
          </Typography>
          <Divider />

          <Typography>Total number of stalls :</Typography>
          <Typography>Total number of available stalls :</Typography>
          <Typography>Total number of occupied stalls :</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default ViewMarketLease;
