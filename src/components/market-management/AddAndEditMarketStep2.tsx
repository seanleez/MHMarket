import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MARKET_TYPE, rootURL } from '../../const/const';
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
  const params = useParams();
  const isAtEditPage = location.pathname.includes('/market/edit');
  const token = JSON.parse(
    localStorage.getItem('currentUser') ?? ''
  )?.access_token;

  useEffect(() => {
    if (isAtEditPage) {
      fetch(`${rootURL}/markets/${params.id}/floors?draft=true`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.floors) {
            floorContext.setListFloors(data.floors);
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    navigate('/market-management');
  };

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };
  const handlePublish = () => {
    console.log('delete');
  };

  return (
    <div className="form-container">
      <MarketFormStep2 onPublish={handlePublish} />
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
