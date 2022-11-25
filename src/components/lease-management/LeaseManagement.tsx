import { TextField } from '@mui/material';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEASE_MANAGEMENT, rootURL } from '../../const/const';
import { IManagementTableFormat } from '../../const/interface';
import SelectSearch from '../common/select-search/SelectSearch';
import TableManagement from '../common/table-management/TableManagement';

const MARKET_LEASE_SEARCH_FIELDS = [
  {
    value: 'lease_code',
    label: 'Lease ID',
  },
  {
    value: 'market_name',
    label: 'Market Name',
  },
  {
    value: 'first_name',
    label: 'First Name',
  },
  {
    value: 'last_name',
    label: 'Last Name',
  },
];

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
  const [selectValue, setSelectValue] = useState<string>(
    MARKET_LEASE_SEARCH_FIELDS[0].value
  );
  const [inputValue, setInputValue] = useState<string>('');
  const globalRows = useRef([]);
  const navigate = useNavigate();

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
          globalRows.current = response.items ?? [];
          setRows(response.items ?? []);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (['first_name', 'last_name'].includes(selectValue)) {
      setRows(
        globalRows.current.filter((row: any) =>
          row?.owner?.[`${selectValue}`].includes(inputValue)
        )
      );
    } else {
      setRows(
        globalRows.current.filter((row: any) =>
          row?.[`${selectValue}`].includes(inputValue)
        )
      );
    }
  }, [selectValue, inputValue]);

  const handleView = (id: string) => {
    navigate(`/lease-management/view/${id}`);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <SelectSearch
        searchFields={MARKET_LEASE_SEARCH_FIELDS}
        onChangeSelect={handleChangeSelect}
        onChangeInput={handleChangeInput}
      />
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
