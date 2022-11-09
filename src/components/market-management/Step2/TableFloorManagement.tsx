import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { getIdFieldByName } from '../../../helper/helperFuncs';
import DeleteIcon from '../../../assets/icon/delete-icon.svg';
import EditIcon from '../../../assets/icon/edit-icon.svg';

interface ITableFloorManagement {
  name: string;
  columns: any;
  rows?: any;
  isDisableAddNewBtn?: boolean;
  onAddNew?: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableFloorManagement: FC<ITableFloorManagement> = (props) => {
  const {
    name,
    columns,
    rows,
    isDisableAddNewBtn,
    onAddNew,
    onEdit,
    onDelete,
  } = props;
  const [data, setData] = useState<any>(rows);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  const getTableCellContent = (
    name: string,
    column: any,
    row: any,
    id: string
  ) => {
    const rowValueByColId = row[column.id];
    switch (column.id) {
      case 'action': {
        return (
          <>
            <IconButton onClick={() => onEdit(id)}>
              <img src={EditIcon} alt={EditIcon} />
            </IconButton>
            <IconButton onClick={() => onDelete(id)}>
              <img src={DeleteIcon} alt={DeleteIcon} />
            </IconButton>
          </>
        );
      }

      default: {
        return <span>{rowValueByColId}</span>;
      }
    }
  };

  const handleCollapse = () => {
    console.log('collapse');
  };

  return (
    <div className={'table-management-container nested-table'}>
      <div className="table-management-features">
        <Button
          variant="contained"
          disabled={isDisableAddNewBtn}
          onClick={onAddNew}>
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
            {data.map((row: any, index: any) => {
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
    </div>
  );
};

export default TableFloorManagement;
