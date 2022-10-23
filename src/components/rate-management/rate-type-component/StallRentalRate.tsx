import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { IManagementTableFormat } from '../../../const/interface';
import TableStallRate from '../../common/table-stall-rate/TableStallRate';

const columns: readonly IManagementTableFormat[] = [
  { id: 'clazz', label: 'Class*', width: '40%', align: 'center' },
  {
    id: 'amount',
    label: 'Amount*',
    width: '40%',
    align: 'center',
  },
  { id: 'action', label: 'Action', width: '20%', align: 'center' },
];

const StallRentalRate = (props: any) => {
  const { amounts } = props;
  const [rows, setRows] = useState(amounts ?? []);

  const handleDelete = (index: number) => {
    console.log(index);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TableStallRate columns={columns} rows={rows} onDelete={handleDelete} />
    </Box>
  );
};

export default StallRentalRate;
