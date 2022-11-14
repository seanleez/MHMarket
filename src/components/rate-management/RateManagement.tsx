import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RATE_TYPE, rootURL } from '../../const/const';
import ConfirmDialog from '../common/dialog/ConfirmDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import TableManagement from '../common/table-management/TableManagement';
import { IManagementTableFormat } from '../../const/interface';

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

  useEffect(() => {
    console.log('rows', rows);
  });

  const currentUser = localStorage.getItem('currentUser') ? 
    JSON.parse(localStorage.getItem('currentUser') as string) : 
    null;
  const token = currentUser?.access_token;


  useEffect(() => {
    fetch(`${rootURL}/rates`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setRows(data.items);
      })
      .catch((err) => console.error(err));
    // When delete a role, fetch this APIGET again to get new data
  }, [openAlertDialog]);

  const handleAddNew = () => {
    navigate('/rate/add-new');
  };

  const handleAcceptDialog = () => {
    fetch(`${rootURL}/rates/${currentID.current}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpenConfirmDialog(false);
        setOpenAlertDialog(true);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id: string) => {
    currentID.current = id;
    setOpenConfirmDialog(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/rate/edit/${id}`);
  };

  return (
    <>
      <TableManagement
        name={'RATE MANAGEMENT'}
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
