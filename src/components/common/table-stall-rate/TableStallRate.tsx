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
  TableRow,
  TextField,
} from '@mui/material';
import { FC } from 'react';
import DeleteIcon from '../../../assets/icon/delete-icon.svg';
import { CLASS_RENTAL_AMOUNT } from '../../../const/const';

interface ITableStallRate {
  columns: any;
  rows?: any;
  onAddNew: () => void;
  onDelete: (id: string) => void;
}

const TableStallRate: FC<ITableStallRate> = (props) => {
  const { columns, rows, onAddNew, onDelete } = props;

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
            {rows.map((row: any, index: number) => {
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
    </div>
  );
};

export default TableStallRate;
