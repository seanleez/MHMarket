import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rootURL } from '../../const/const';
import { IManagementTableFormat } from '../../const/interface';
import ConfirmDialog from '../common/dialog/ConfirmDialog';
import ErrorDialog from '../common/dialog/ErrorDialog';
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
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [rows, setRows] = useState<any>([]);
  const currentID = useRef<string>('');
  const errMess = useRef<string>('');

  const navigate = useNavigate();

  const currentUser = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') as string)
    : null;
  const token = currentUser?.access_token;

  useEffect(() => {
    fetch(`${rootURL}/markets`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setRows(response.items);
      })
      .catch((err) => console.error(err));
    // When delete a market, fetch this APIGET again to get new data
  }, [openSuccessDialog]);

  const handleDeleteMarket = () => {
    fetch(`${rootURL}/markets/${currentID.current}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setOpenConfirmDialog(false);
        if (response.error_code) {
          errMess.current = response.error_description;
          setOpenErrorDialog(true);
        } else {
          setOpenSuccessDialog(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleAddNew = () => {
    navigate('/market/add-new/step1');
  };

  const handleOpenConfirmDialog = (id: string) => {
    console.log(id);
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
        onDelete={handleOpenConfirmDialog}
      />
      <ConfirmDialog
        openProp={openConfirmDialog}
        message={`Are you sure you wanna delete ${
          rows.find((row: any) => row.market_id === currentID.current)?.name
        } ?`}
        onCloseDialog={() => setOpenConfirmDialog(false)}
        onAcceptDialog={handleDeleteMarket}
      />
      <SuccessDialog
        openProp={openSuccessDialog}
        message={'Delete Successfully!'}
        onCloseDialog={() => setOpenSuccessDialog(false)}
      />
      <ErrorDialog
        openProp={openErrorDialog}
        message={errMess.current}
        onCloseDialog={() => setOpenErrorDialog(false)}
      />
    </>
  );
};

export default MarketManagement;
