import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rootURL } from '../../const/const';
import { IManagementTableFormat } from '../../const/interface';
import ConfirmDialog from '../common/dialog/ConfirmDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import TableManagement from '../common/table-management/TableManagement';

const columns: readonly IManagementTableFormat[] = [
  {
    id: 'index',
    label: '',
    width: '5%',
    align: 'center',
  },
  {
    id: 'name',
    label: 'MARKET NAME',
    width: '15%',
    align: 'center',
    isHaveSortIcon: true,
  },
  {
    id: 'market_location',
    label: 'LOCATION',
    width: '30%',
    align: 'center',
    isHaveSortIcon: true,
  },
  { id: 'market_type', label: 'MARKET TYPE', width: '20%', align: 'center' },
  {
    id: 'status',
    label: 'STATUS',
    width: '15%',
    align: 'center',
    isHaveSortIcon: true,
  },
  { id: 'action', label: 'ACTION', width: '15%', align: 'center' },
];

const MarketManagement = () => {
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
    fetch(`${rootURL}/markets`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        setRows(data.items);
      })
      .catch((err) => console.error(err));
    // When delete a role, fetch this APIGET again to get new data
  }, [openAlertDialog]);

  const handleAcceptDialog = () => {
    fetch(`${rootURL}/markets/${currentID.current}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOpenConfirmDialog(false);
        setOpenAlertDialog(true);
      })
      .catch((err) => console.error(err));
  };

  const handleAddNew = () => {
    navigate('/market/add-new/step1');
  };

  const handleDelete = (id: string) => {
    currentID.current = id;
    setOpenConfirmDialog(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/market/edit/step1/${id}`);
  };

  return (
    <>
      <TableManagement
        name={'MARKET MANAGEMENT'}
        columns={columns}
        rows={rows}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        // onDelete={handleDelete}
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

export default MarketManagement;
