import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FloorContext } from '../../context/FloorContext';
import AlertDialog from '../common/dialog/AlertDialog';
import ErrorDialog from '../common/dialog/ErrorDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import MarketFormStep2 from './MarketFormStep2';

const AddAndEditMarketStep2 = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

  const floorContext = useContext(FloorContext);

  const errorMes = useRef<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  const isAtEditPage = location.pathname.includes('/market/edit');

  useEffect(() => {
    if (!isAtEditPage) return;
    floorContext.updateListFloors();
  }, []);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    navigate('/market-management');
  };

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

  return (
    <div className="container">
      <MarketFormStep2 />
      <AlertDialog
        openProp={openAlertDialog}
        message={'All classes have to be unique'}
        onCloseDialog={handleCloseAlertDialog}
      />
      <ErrorDialog
        openProp={openErrorDialog}
        message={errorMes.current}
        onCloseDialog={() => setOpenErrorDialog(false)}
      />
      <SuccessDialog
        openProp={openSuccessDialog}
        message={`${isAtEditPage ? 'Update' : 'Create'} Successfully!`}
        onCloseDialog={handleCloseSuccessDialog}
      />
    </div>
  );
};

export default AddAndEditMarketStep2;
