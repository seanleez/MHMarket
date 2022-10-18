import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rootURL } from '../../const/const';
import AlertDialog from '../common/dialog/AlertDialog';
import ConfirmDialog from '../common/dialog/ConfirmDialog';
import TableManagement from '../common/table-management/TableManagement';
import './RoleManagement.scss';

interface IRoleManagementTableFormat {
  id: string;
  label: string;
  width?: string;
  align?: 'left' | 'center';
  isHaveSortIcon?: boolean;
}

// id of columns have to fit with id
const columns: readonly IRoleManagementTableFormat[] = [
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

  useEffect(() => {
    console.log(rows);
  });

  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
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
    navigate(`/role/edit/${id}`);
    console.log('edit');
  };

  return (
    <>
      <TableManagement
        name={'ROLE MANAGEMENT'}
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
      <AlertDialog
        openProp={openAlertDialog}
        message={'Delete Successfully!'}
        onCloseDialog={() => setOpenAlertDialog(false)}
      />
    </>
  );
};

export default RoleManagement;
