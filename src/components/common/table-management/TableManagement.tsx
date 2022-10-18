import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
  TablePagination,
} from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import DeleteIcon from '../../../assets/icon/delete-icon.svg';
import EditIcon from '../../../assets/icon/edit-icon.svg';
import SortIcon from '../../../assets/icon/sort-icon.svg';
import './TableManagement.scss';

interface ITableManagement {
  name: string;
  columns: any;
  rows: any;
  onAddNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableManagement: FC<ITableManagement> = (props) => {
  const { name, columns, rows, onAddNew, onEdit, onDelete } = props;
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>('');
  const [data, setData] = useState<any>(rows);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  useEffect(() => {
    console.log(rows);
  }, []);

  let toggleSorting = useRef<boolean>(true);

  useEffect(() => {
    setData(
      rows.filter((row: any) =>
        row[columns[1].id].toLowerCase().includes(searchValue)
      )
    );
  }, [searchValue]);

  const listIconActionByName = [
    {
      name: 'Role Management',
      icons: [
        {
          name: EditIcon,
          onClick: onEdit,
        },
        {
          name: DeleteIcon,
          onClick: onDelete,
        },
      ],
    },
    // {
    //   name: 'Role Management1',
    //   listIcon: [DeleteIcon, EditIcon],
    // },
    // {
    //   name: 'Role Management2',
    //   listIcon: [DeleteIcon, EditIcon],
    // },
  ];

  const getTableCellContent = (
    name: string,
    column: any,
    row: any,
    page: number,
    rowsPerPage: number,
    index: number,
    id: string
  ) => {
    switch (column.id) {
      case 'index': {
        return page * rowsPerPage + index + 1;
      }
      case 'action': {
        return (
          <>
            {listIconActionByName
              .find((item) => item.name.toUpperCase() === name)
              ?.icons.map((icon: any, index: number) => {
                return (
                  <IconButton key={index} onClick={() => icon.onClick(id)}>
                    <img src={icon.name} alt={`${icon}`} />
                  </IconButton>
                );
              })}
          </>
        );
      }
      case 'status': {
        return (
          <>
            <span
              className={`status ${row.status === 1 ? 'active' : 'inactive'}`}>
              {row.status === 1 ? 'active' : 'inactive'}
            </span>
          </>
        );
      }
      default: {
        return <span>{row[column.id]}</span>;
      }
    }
  };

  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSort = (id: string) => {
    toggleSorting.current = !toggleSorting.current;
    const newData = [...data].sort((a: any, b: any) => {
      if (!(typeof a[id] === 'number')) {
        return toggleSorting.current
          ? b[id].localeCompare(a[id])
          : a[id].localeCompare(b[id]);
      }
      return toggleSorting.current ? a[id] - b[id] : b[id] - a[id];
    });
    setData(newData);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="table-management-container">
      <span className="table-management-title">{name}</span>
      <div className="table-management-features">
        <Button variant="contained" className="primary" onClick={onAddNew}>
          Add New
          <AddIcon />
        </Button>
        <div className="search-field">
          <span>Search:</span>
          <TextField value={searchValue} onChange={handleSearchValue} />
        </div>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column: any, index: number) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    width: column.width,
                  }}>
                  {column.label}
                  {column.isHaveSortIcon && (
                    <IconButton onClick={() => handleSort(column.id)}>
                      <img src={SortIcon} alt="SortIcon" />
                    </IconButton>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: any) => {
                return (
                  <TableRow key={row.role_id}>
                    {columns.map((column: any) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {getTableCellContent(
                            name,
                            column,
                            row,
                            page,
                            rowsPerPage,
                            index,
                            row.role_id
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={
          data.filter((row: any) =>
            row[columns[1].id].toLowerCase().includes(searchValue)
          ).length
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableManagement;
