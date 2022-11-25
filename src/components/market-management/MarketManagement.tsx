import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MARKET_MANAGEMENT, rootURL } from '../../const/const';
import { IManagementTableFormat } from '../../const/interface';
import marketApis from '../../services/marketApis';
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
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // When delete a market, call this APIGET again to get new data
    (async () => {
      try {
        const res = await marketApis.getMarkets();
        setRows((res as any).items ?? []);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  }, [openSuccessDialog]);

  const handleDeleteMarket = () => {
    setOpenConfirmDialog(false);
    (async () => {
      try {
        const res = await marketApis.deleteMarket(currentID.current);
        setOpenSuccessDialog(true);
        setRows((res as any).items ?? []);
      } catch (error) {
        errMess.current = error as string;
        setOpenErrorDialog(true);
      }
    })();
  };

  const handleAddNew = () => {
    localStorage.setItem('marketId', '');
    navigate('/market/add-new/step1');
  };

  const handleOpenConfirmDialog = (id: string) => {
    console.log(id);
    currentID.current = id;
    setOpenConfirmDialog(true);
  };

  const handleEdit = (id: string) => {
    localStorage.setItem('marketId', id);
    navigate(`/market/edit/step1/${id}`);
  };

  return (
    <>
      <TableManagement
        name={MARKET_MANAGEMENT}
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
