import { Box, Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IManagementTableFormat } from '../../const/interface';
import ProgressCirle from '../common/progress-circle/ProgressCircle';
import AddNewFloorForm from './Step2/AddNewFloorForm';
import TableFloorManagement from './Step2/TableFloorManagement';

const columns: readonly IManagementTableFormat[] = [
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
  { id: 'action', label: 'Action', width: '15%', align: 'center' },
];

const MarketFormStep2 = (props: any) => {
  const { rows, onSubmit, onAddNew, onEdit, onDelete, onPublish } = props;
  const [isHaveAddNewForm, setIsHaveAddNewForm] = useState<boolean>(false);
  const isAtEditPage = location.pathname.includes('/market/edit');

  const navigate = useNavigate();
  const params = useParams();
  const token = JSON.parse(
    localStorage.getItem('currentUser') ?? ''
  )?.access_token;

  const handleCancelFloor = () => {
    setIsHaveAddNewForm(false);
  };

  const handleAddNewFloor = () => {
    setIsHaveAddNewForm(true);
  };

  return (
    <>
      <span className="title">
        {isAtEditPage ? 'EDIT MARKET' : 'ADD NEW MARKET'}
      </span>
      <ProgressCirle step={2} />
      <div className="section-title">FLOOR PLAN</div>
      <Box sx={{ marginBottom: '40px' }}>
        <TableFloorManagement
          name={'Floor Management'}
          isDisableAddNewBtn={isHaveAddNewForm}
          columns={columns}
          rows={rows}
          onAddNew={handleAddNewFloor}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        {isHaveAddNewForm && (
          <AddNewFloorForm onSubmit={onSubmit} onCancel={handleCancelFloor} />
        )}
      </Box>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate(`/market/edit/step1/${params.id}`)}>
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={onPublish}>
          Publish
        </Button>
      </Container>
    </>
  );
};

export default MarketFormStep2;
