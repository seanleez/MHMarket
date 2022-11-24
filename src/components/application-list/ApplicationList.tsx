import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rootURL, VIEW_APPLICATION_LIST } from '../../const/const';
import { IManagementTableFormat } from '../../const/interface';
import SuccessDialog from '../common/dialog/SuccessDialog';
import SelectSearch from '../common/select-search/SelectSearch';
import TableManagement from '../common/table-management/TableManagement';
import ConfirmDialog from "../common/dialog/ConfirmDialog";
import ErrorDialog from "../common/dialog/ErrorDialog";

const APPLICATION_LIST_SEARCH_FIELDS = [
  {
    value: 'code',
    label: 'Application Id',
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

const columns: readonly IManagementTableFormat[] = [
  {
    id: 'code',
    label: 'APPLICATION ID',
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
    id: 'status',
    label: 'STATUS',
    width: '15%',
    align: 'center',
    isHaveSortIcon: true,
  },
  { id: 'action', label: 'ACTION', width: '10%', align: 'center' },
];

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const ApplicationList: React.FC = () => {
  const [rows, setRows] = useState([]);
  const [selectValue, setSelectValue] = useState(
    APPLICATION_LIST_SEARCH_FIELDS[0].value
  );

  const [inputValue, setInputValue] = useState('');
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const globalRows = useRef([]);
  const navigate = useNavigate();
  const currentID = useRef<string>('');
  const errMess = useRef<string>('');

  useLayoutEffect(() => {
    fetch(`${rootURL}/applications`, {
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
          // use globalRow.current for storing original rows
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

  const handleDeleteApplication = () => {
    fetch(`${rootURL}/applications/${currentID.current}`, {
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

  const handleChangeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleView = (id: string) => {
    navigate(`/application/view/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(id);
    currentID.current = id;
    setOpenConfirmDialog(true);
  };

  const handleEdit = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <SelectSearch
        searchFields={APPLICATION_LIST_SEARCH_FIELDS}
        onChangeSelect={handleChangeSelect}
        onChangeInput={handleChangeInput}
      />
      <TableManagement
        name={VIEW_APPLICATION_LIST}
        columns={columns}
        rows={rows}
        isHaveSelectSearchField={true}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ConfirmDialog
          openProp={openConfirmDialog}
          message={`Are you sure you want to delete this application?`}
          onCloseDialog={() => setOpenConfirmDialog(false)}
          onAcceptDialog={handleDeleteApplication}
      />
      <SuccessDialog
        openProp={openSuccessDialog}
        message="Delete Successfully"
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

export default ApplicationList;
