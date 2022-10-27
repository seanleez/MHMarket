import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
  CLASS_RENTAL_AMOUNT,
  INIT_TABLE_ROWS_NUMBER,
  ROWS_PER_PAGE_OPTION,
} from '../../../const/const';
import DeleteIcon from '../../../assets/icon/delete-icon.svg';

interface ITableStallRate {
  columns: any;
  rows?: any;
  onAddNew: () => void;
  onDelete: (id: string) => void;
}

const TableStallRate: FC<ITableStallRate> = (props) => {
  const { columns, rows, onAddNew, onDelete } = props;
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    INIT_TABLE_ROWS_NUMBER
  );

  const getTableCellContent = (row: any, column: any, index: number) => {
    if (column.id === 'clazz') {
      return (
        <TextField
          required
          select
          name={`clazz-${index}`}
          label="Rate Detail"
          defaultValue={row[column.id] ?? ''}
          style={{ width: '80%' }}>
          {CLASS_RENTAL_AMOUNT.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    } else if (column.id === 'amount') {
      return (
        <TextField
          required
          name={`amount-${index}`}
          label="Amount"
          variant="outlined"
          defaultValue={row[column.id] ?? ''}
          type="number"
          style={{ width: '80%' }}
        />
      );
    } else {
      return (
        <IconButton onClick={() => onDelete(row.id)}>
          <img src={DeleteIcon} alt={`${DeleteIcon}`} />
        </IconButton>
      );
    }
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
      <div className="table-management-features">
        <Button variant="contained" className="primary" onClick={onAddNew}>
          Add New
          <AddIcon />
        </Button>
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
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => {
                console.log(row.id);
                return (
                  <TableRow key={row.id}>
                    {columns.map((column: any) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {getTableCellContent(row, column, index)}
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
        rowsPerPageOptions={ROWS_PER_PAGE_OPTION}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableStallRate;
