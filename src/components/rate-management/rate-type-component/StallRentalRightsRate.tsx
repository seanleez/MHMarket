import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { IManagementTableFormat } from '../../../const/interface';
import TableStallRate from '../../common/table-stall-rate/TableStallRate';
import { v4 as uuid } from 'uuid';
import AlertDialog from '../../common/dialog/AlertDialog';

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
  const [rows, setRows] = useState(
    amounts
      ? amounts.map((row: any) => {
          return { ...row, id: uuid() };
        })
      : []
  );
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);

  const alertMessage = useRef<string>('');

  useEffect(() => {
    console.log('rows', rows);
  }, [rows]);

  const handleDelete = (id: string) => {
    const newRows = [...rows];
    setRows(newRows.filter((row: any) => row.id !== id));
  };

  const handleAddNew = () => {
    if (rows.length < 3) {
      const newRows = [...rows];
      newRows.push({
        id: uuid(),
        clazz: 1,
        amount: '',
      });
      setRows(newRows);
    } else {
      alertMessage.current = 'Only 3 classes allowed at most';
      setOpenAlertDialog(true);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TableStallRate
        columns={columns}
        rows={rows}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
      <AlertDialog
        openProp={openAlertDialog}
        message={alertMessage.current}
        onCloseDialog={() => setOpenAlertDialog(false)}
      />
    </Box>
  );
};

export default StallRentalRightsRate;
