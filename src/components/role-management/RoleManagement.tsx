import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLE_MANAGEMENT, rootURL } from '../../const/const';
import ConfirmDialog from '../common/dialog/ConfirmDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import TableManagement from '../common/table-management/TableManagement';
import './RoleManagement.scss';
import { IManagementTableFormat } from '../../const/interface';

// id of columns have to fit with id
const columns: readonly IManagementTableFormat[] = [
  { id: 'index', label: '', width: '5%', align: 'center' },
  {
    id: 'name',
    label: 'ROLE NAME',
    width: '25%',
    align: 'left',
    isHaveSortIcon: true,
  },
  { id: 'description', label: 'DESCRIPTION', width: '40%', align: 'left' },
  {
    id: 'status',
    label: 'STATUS',
    width: '15%',
    align: 'center',
    isHaveSortIcon: true,
  },
  { id: 'action', label: 'ACTION', width: '15%', align: 'center' },
];

const RoleManagement: FC = () => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [rows, setRows] = useState<any>([]);
  const currentID = useRef<string>('');

  const navigate = useNavigate();

  const currentUser = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') as string)
    : null;
  const token = currentUser?.access_token;

  useEffect(() => {
    fetch(`${rootURL}/roles`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRows(data.items);
      })
      .catch((err) => console.error(err));
    // When delete a role, fetch this APIGET again to get new data
  }, [openAlertDialog]);

  const handleAddNew = () => {
    navigate('/role/add-new');
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
    console.log(id);
    navigate(`/role/edit/${id}`);
  };

  return (
    <>
      <TableManagement
        name={ROLE_MANAGEMENT}
        columns={columns}
        rows={rows}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ConfirmDialog
        openProp={openConfirmDialog}
        message={`Are you sure you wanna delete ${
          rows.find((row: any) => row.role_id === currentID.current)?.name
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

export default RoleManagement;
