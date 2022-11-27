import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_MANAGEMENT } from '../../const/const';
import { IManagementTableFormat } from '../../const/interface';
import userApis from '../../services/userApis';
import ConfirmDialog from '../common/dialog/ConfirmDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import TableManagement from '../common/table-management/TableManagement';

const columns: readonly IManagementTableFormat[] = [
  {
    id: 'first_name',
    label: 'FIRST NAME',
    width: '15%',
    align: 'center',
    isHaveSortIcon: true,
  },
  {
    id: 'last_name',
    label: 'LAST NAME',
    width: '15%',
    align: 'center',
    isHaveSortIcon: true,
  },
  { id: 'email', label: 'EMAIL', width: '20%', align: 'center' },
  {
    id: 'roles',
    label: 'ROLES',
    width: '20%',
    align: 'center',
    isHaveSortIcon: true,
  },
  { id: 'status', label: 'STATUS', width: '15%', align: 'center' },
  { id: 'action', label: 'ACTION', width: '15%', align: 'center' },
];

const UserManagement = () => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [rows, setRows] = useState<any>([]);
  const currentID = useRef<string>('');

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const res = await userApis.getUsers();
        setRows((res as any).items ?? []);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
    // When delete a role, call this APIGET again to get new data
  }, [openAlertDialog]);

  const handleAcceptDialog = () => {
    setOpenConfirmDialog(false);
    (async () => {
      try {
        await userApis.deleteUser(currentID.current);
        setOpenAlertDialog(true);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  };

  const handleAddNew = () => {
    navigate('/user/add-new');
  };

  const handleDelete = (id: string) => {
    currentID.current = id;
    setOpenConfirmDialog(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/user/edit/${id}`);
  };

  return (
    <>
      <TableManagement
        name={USER_MANAGEMENT}
        columns={columns}
        rows={rows}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ConfirmDialog
        openProp={openConfirmDialog}
        message={`Are you sure you wanna delete ${
          rows.find((row: any) => row.user_id === currentID.current)?.first_name
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

export default UserManagement;
