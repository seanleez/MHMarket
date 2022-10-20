import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rootURL } from '../../const/const';
import { IManagementTableFormat } from '../../const/interface';
import ConfirmDialog from '../common/dialog/ConfirmDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import TableManagement from '../common/table-management/TableManagement';

const columns: readonly IManagementTableFormat[] = [
  { id: 'user_id', label: 'USER ID', width: '10%', align: 'center' },
  {
    id: 'first_name',
    label: 'USER NAME',
    width: '20%',
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

  useEffect(() => {
    console.log(rows);
  });

  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const token = currentUser?.access_token;
  useEffect(() => {
    fetch(`${rootURL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items);
        setRows(data.items);
      })
      .catch((err) => console.error(err));
    // When delete a role, fetch this APIGET again to get new data
  }, [openAlertDialog]);

  const handleAddNew = () => {
    navigate('/user/add-new');
  };

  const handleAcceptDialog = () => {
    fetch(`${rootURL}/roles/${currentID.current}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOpenConfirmDialog(false);
        setOpenAlertDialog(true);
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id: string) => {
    currentID.current = id;
    setOpenConfirmDialog(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/role/edit/${id}`);
    console.log('edit');
  };

  return (
    <>
      <TableManagement
        name={'USER MANAGEMENT'}
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
