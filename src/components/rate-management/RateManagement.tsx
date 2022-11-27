import { useSnackbar } from 'notistack';
import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RATE_MANAGEMENT, RATE_TYPE } from '../../const/const';
import { IManagementTableFormat } from '../../const/interface';
import rateApis from '../../services/rateApis';
import ConfirmDialog from '../common/dialog/ConfirmDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import TableManagement from '../common/table-management/TableManagement';

// id of columns have to fit with id
const columns: readonly IManagementTableFormat[] = [
  { id: 'index', label: '', width: '5%', align: 'center' },
  {
    id: 'type',
    label: 'RATE TYPE',
    width: '25%',
    align: 'left',
    isHaveSortIcon: true,
  },
  { id: 'other_rate', label: 'RATE DETAIL', width: '40%', align: 'left' },
  {
    id: 'status',
    label: 'APPROVAL STATUS',
    width: '15%',
    align: 'center',
  },
  { id: 'action', label: 'ACTION', width: '15%', align: 'center' },
];

const RateManagement: FC = () => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [rows, setRows] = useState<any>([]);
  const currentID = useRef<string>('');

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // When delete a role, call this APIGET again to get new data
    (async () => {
      try {
        const res = await rateApis.getRates();
        setRows((res as any).items ?? []);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  }, [openAlertDialog]);

  const handleAcceptDialog = () => {
    (async () => {
      try {
        await rateApis.deleteRate(currentID.current);
        setOpenConfirmDialog(false);
        setOpenAlertDialog(true);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  };

  const handleAddNew = () => {
    navigate('/rate/add-new');
  };

  const handleEdit = (id: string) => {
    navigate(`/rate/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    currentID.current = id;
    setOpenConfirmDialog(true);
  };

  return (
    <>
      <TableManagement
        name={RATE_MANAGEMENT}
        columns={columns}
        rows={rows}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ConfirmDialog
        openProp={openConfirmDialog}
        message={`Are you sure you wanna delete ${
          RATE_TYPE.find(
            (item: any) =>
              item.type ===
              rows.find((row: any) => row.rate_id === currentID.current)?.type
          )?.value
        } ?`}
        onCloseDialog={() => setOpenConfirmDialog(false)}
        onAcceptDialog={handleAcceptDialog}
      />
      <SuccessDialog
        openProp={openAlertDialog}
        message={'Delete Successfully!'}
        onCloseDialog={() => setOpenAlertDialog(false)}
      />
    </>
  );
};

export default RateManagement;
