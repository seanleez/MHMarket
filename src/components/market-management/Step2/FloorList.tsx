import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IManagementTableFormat } from '../../../const/interface';
import FloorInformation from './FloorInformation';
import AddIcon from '@mui/icons-material/Add';
import AddNewFloor from './AddNewFloor';

interface IFloorList {
  listFloors: any;
}

const FLOOR_LIST_COLUMN: IManagementTableFormat[] = [
  {
    id: 'floor_name',
    label: 'Floor Name',
    width: '25%',
    align: 'center',
  },
  {
    id: 'image_name',
    label: 'Floor Plan',
    width: '25%',
    align: 'center',
  },
  {
    id: 'stall_with_detail',
    label: 'Total Stall Details',
    width: '20%',
    align: 'center',
  },
  {
    id: 'total_stalls',
    label: 'Total Stalls',
    width: '15%',
    align: 'center',
  },
  { id: 'action', label: 'Action', width: '10%', align: 'center' },
  { id: 'expand', label: '', width: '5%', align: 'center' },
];

const FloorList: React.FC<IFloorList> = (props) => {
  const { listFloors } = props;
  const [isHaveAddNewRow, setIsHaveAddNewRow] = useState(false);

  return (
    <Box sx={{ marginBottom: '40px' }}>
      <Box
        sx={{ display: 'flex', backgroundColor: '#c6d9ee', padding: '10px 0' }}>
        {FLOOR_LIST_COLUMN.map((item: any, i: number) => (
          <Typography
            key={i}
            style={{ width: item.width, textAlign: item.align }}>
            {item.label}
          </Typography>
        ))}
      </Box>
      <Box>
        {listFloors.map((floor: any) => (
          <FloorInformation
            floor={floor}
            columns={FLOOR_LIST_COLUMN}
            displayMode={true}
          />
        ))}
      </Box>
      {isHaveAddNewRow && (
        <AddNewFloor onCancel={() => setIsHaveAddNewRow(false)} />
      )}
      <Button
        disabled={isHaveAddNewRow}
        variant="contained"
        onClick={() => setIsHaveAddNewRow(true)}>
        Add New
        <AddIcon />
      </Button>
    </Box>
  );
};

export default FloorList;
