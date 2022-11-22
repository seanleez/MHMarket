import { Box, Divider, Typography } from '@mui/material';
import { useLayoutEffect, useMemo, useState } from 'react';
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
  const [leaseInfor, setLeaseInfor] = useState<any>([]);
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

  const labelValuePair: TPair[] = useMemo(() => {
    return [
      { label: 'Search Id', value: leaseInfor?.lease_code },
      { label: 'Stallholder Name', value: 1 },
      { label: 'Market Name', value: 1 },
      { label: 'Lease Start Date', value: 1 },
      { label: 'Stall Number', value: 1 },
      { label: 'Lease End Date', value: 1 },
    ];
  }, [leaseInfor]);
  return (
    <div className="container">
      <span className="title">VIEW MARKET LEASE</span>

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
      <Box sx={{ display: 'flex', margin: 'auto' }}>
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
    </div>
  );
};

export default ViewMarketLease;
