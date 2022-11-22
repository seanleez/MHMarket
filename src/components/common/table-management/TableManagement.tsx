import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import SortIcon from '../../../assets/icon/sort-icon.svg';
import {
  INIT_TABLE_ROWS_NUMBER,
  LEASE_STATUS,
  MARKET_TYPE,
  OTHER_RATE_DETAIL,
  RATE_MANAGEMENT,
  RATE_TYPE,
  ROWS_PER_PAGE_OPTION,
} from '../../../const/const';
import getListActionsByTableName from '../../../helper/getListActionsByTableName';
import {
  getIdFieldByName,
  getSearchField,
  sortAscendingly,
  sortDescendingly,
} from '../../../helper/helperFuncs';

interface ITableManagement {
  name: string;
  columns: any;
  rows?: any;
  dontHaveSearchField?: boolean;
  dontHavePagination?: boolean;
  isHaveSelectSearchField?: boolean;
  isNestedTable?: boolean;
  isDisableAddNewBtn?: boolean;
  onAddNew?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

const TableManagement: FC<ITableManagement> = (props) => {
  const {
    name,
    columns,
    rows,
    dontHaveSearchField,
    dontHavePagination,
    isHaveSelectSearchField,
    isNestedTable,
    isDisableAddNewBtn,
    onAddNew,
    onEdit,
    onDelete,
    onView,
  } = props;

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    INIT_TABLE_ROWS_NUMBER
  );
  const [data, setData] = useState<any>(rows);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  let toggleSorting = useRef<boolean>(true);

  const getTableCellContent = (
    name: string,
    column: any,
    row: any,
    page: number,
    rowsPerPage: number,
    index: number,
    id: string
  ) => {
    const rowValueByColId = row[column.id];
    switch (column.id) {
      // ROLE MANAGEMENT
      case 'index': {
        return page * rowsPerPage + index + 1;
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

      // USER MANAGEMENT
      case 'roles': {
        return rowValueByColId ? (
          rowValueByColId.map((role: string, index: number) => (
            <span key={index}>{role}</span>
          ))
        ) : (
          <span></span>
        );
      }
      case 'user_id': {
        return <span>{rowValueByColId.slice(0, 8)}</span>;
      }

      // RATE MANAGEMENT
      case 'type': {
        return (
          <span>
            {
              RATE_TYPE.find((item: any) => item.type === rowValueByColId)
                ?.value
            }
          </span>
        );
      }
      case 'other_rate': {
        return rowValueByColId ? (
          <span>
            {
              OTHER_RATE_DETAIL.find(
                (item: any) => item.detail === rowValueByColId.detail
              )?.value
            }
          </span>
        ) : (
          <span></span>
        );
      }

      // MARKET MANAGEMENT
      case 'market_location': {
        return row['location'] ? (
          <span>{`${row['location']['address'] + ',' ?? ''} ${
            row['location']['district'] ?? ''
          }`}</span>
        ) : (
          <span></span>
        );
      }

      case 'market_type': {
        return row['type'] ? (
          <span>
            {MARKET_TYPE.find((item: any) => item.type === row['type'])?.value}
          </span>
        ) : (
          <span></span>
        );
      }

      // LEASE MANAGEMENT
      case 'owner_first_name': {
        return <span>{row?.owner?.['first_name']}</span>;
      }
      case 'owner_last_name': {
        return <span>{row?.owner?.['last_name']}</span>;
      }
      case 'lease_status': {
        return (
          <span>
            {
              LEASE_STATUS.find(
                (option: any) => option.value === rowValueByColId
              )?.label
            }
          </span>
        );
      }

      case 'action': {
        console.log(id);
        return getListActionsByTableName(id, name, onEdit, onDelete, onView);
      }

      default: {
        return <span>{rowValueByColId}</span>;
      }
    }
  };

  const handleSearchValue = () => {
    const searchValue = searchInputRef.current?.value;
    if (name === RATE_MANAGEMENT) {
      const searchedTypeArray = RATE_TYPE.filter((item: any) =>
        item.value.includes(searchValue)
      ).map((item: any) => item.type);
      setData(rows.filter((row: any) => searchedTypeArray.includes(row.type)));
    } else {
      setData(
        rows.filter((row: any) => {
          return row[`${getSearchField(name)}`]
            .toLowerCase()
            .includes(searchValue?.toLowerCase());
        })
      );
    }
  };

  const handleSort = (id: string) => {
    toggleSorting.current = !toggleSorting.current;
    const newData = [...data].sort((a: any, b: any) => {
      return toggleSorting.current
        ? sortAscendingly(a[id], b[id])
        : sortDescendingly(a[id], b[id]);
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
    <div className={`container ${isNestedTable ? 'nested-table' : ''}`}>
      <span className="title">{name}</span>
      <div className="table-features">
        {isHaveSelectSearchField ? (
          <>1</>
        ) : (
          <>
            <Button
              variant="contained"
              disabled={isDisableAddNewBtn}
              onClick={onAddNew}>
              Add New
              <AddIcon />
            </Button>
            {!dontHaveSearchField && (
              <div className="search-field">
                <span>Search:</span>
                <TextField
                  inputRef={searchInputRef}
                  onChange={handleSearchValue}
                  sx={{ flex: 1 }}
                />
              </div>
            )}
          </>
        )}
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
                const idField = getIdFieldByName(name);
                return (
                  <TableRow key={row[`${idField}`]}>
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
                            row[`${idField}`]
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
      {!dontHavePagination && (
        <TablePagination
          rowsPerPageOptions={ROWS_PER_PAGE_OPTION}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};

export default TableManagement;
