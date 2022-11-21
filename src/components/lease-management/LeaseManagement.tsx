import { TextField } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { LEASE_MANAGEMENT, rootURL } from '../../const/const';
import { IManagementTableFormat } from '../../const/interface';
import TableManagement from '../common/table-management/TableManagement';

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const columns: readonly IManagementTableFormat[] = [
  {
    id: 'lease_code',
    label: 'LEASE ID',
    width: '15%',
    align: 'left',
  },
  {
    id: 'owner_first_name',
    label: 'FIRST NAME',
    width: '15%',
    align: 'left',
  },
  {
    id: 'owner_last_name',
    label: 'LAST NAME',
    width: '15%',
    align: 'left',
  },
  { id: 'market_name', label: 'MARKET NAME', width: '15%', align: 'left' },
  {
    id: 'stall_name',
    label: 'STALL NUMBER',
    width: '15%',
    align: 'left',
  },
  {
    id: 'lease_status',
    label: 'LEASE STATUS',
    width: '15%',
    align: 'center',
  },
  { id: 'action', label: 'ACTION', width: '10%', align: 'center' },
];

const LeaseManagement: React.FC = () => {
  const [rows, setRows] = useState([]);

  useLayoutEffect(() => {
    fetch(`${rootURL}/applications/in-lease`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error_code) {
          throw new Error(response.error_description);
        } else {
          console.log(response);
          setRows(response.items ?? []);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleView = (id: string) => {
    console.log(id);
  };
  return (
    <>
      <TableManagement
        name={LEASE_MANAGEMENT}
        columns={columns}
        rows={rows}
        isHaveSelectSearchField={true}
        onView={handleView}
      />
    </>
  );
};

export default LeaseManagement;
