import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { IManagementTableFormat } from '../../../const/interface';
import TableStallRate from '../../common/table-stall-rate/TableStallRate';
import { v4 as uuid } from 'uuid';

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

const StallRentalRightsRate = (props: any) => {
  const { amounts } = props;
  const [rows, setRows] = useState(amounts ?? []);

  useEffect(() => {
    setRows(
      rows.map((row: any) => {
        return { ...row, id: uuid() };
      })
    );
  }, []);

  useEffect(() => {
    console.log('rows', rows);
  }, [rows]);

  const handleDelete = (id: string) => {
    const newRows = [...rows];
    setRows(newRows.filter((row: any) => row.id !== id));
  };

  const handleAddNew = () => {
    const newRows = [...rows];
    newRows.push({
      id: uuid(),
      clazz: 1,
      amount: '',
    });
    setRows(newRows);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TableStallRate
        columns={columns}
        rows={rows}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
    </Box>
  );
};

export default StallRentalRightsRate;
