import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { rootURL } from '../../const/const';
import AlertDialog from '../common/dialog/AlertDialog';
import ErrorDialog from '../common/dialog/ErrorDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import MarketForm from './MarketForm';

const AddAndEditMarket = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [currentEditMarket, setCurrentEditMarket] = useState<any>();

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
      fetch(`${rootURL}/markets/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCurrentEditMarket(data);
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

  const handleSubmit = (e: React.FormEvent, rateType: number) => {
    e.preventDefault();
    const payload: any = {};

    let elementsInForm = (e.target as HTMLFormElement).elements;
    [...elementsInForm].forEach((el) => {
      if (el.nodeName === 'INPUT') {
        const element = el as HTMLInputElement;
        if (element.type === 'text') {
          payload[element.name] = element.value;
        }
        if (element.name === 'status') {
          payload[element.name] = Number(element.value);
        }
      }
    });
    console.log(payload);

    // Call API Add New or Edit
    // const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    // const token = currentUser?.access_token;

    // const fetchURL = isAtEditPage
    //   ? `${rootURL}/markets/${currentEditMarket.rate_id}`
    //   : `${rootURL}/markets`;

    // fetch(fetchURL, {
    //   method: isAtEditPage ? 'PUT' : 'POST',
    //   credentials: 'same-origin',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(payload),
    // })
    //   .then((res) => res.json())
    //   .then((response) => {
    //     if (response.error_code) {
    //       errorMes.current = response?.errors?.type ?? 'Error';
    //       throw new Error(response);
    //     } else {
    //       setOpenSuccessDialog(true);
    //     }
    //   })
    //   .catch((err) => {
    //     console.dir(err);
    //     setOpenErrorDialog(true);
    //   });
  };

  return (
    <div className="form-container text-field-1-4">
      {currentEditMarket && (
        <MarketForm
          currentEditMarket={currentEditMarket}
          onSubmit={handleSubmit}
        />
      )}
      {!currentEditMarket && <MarketForm onSubmit={handleSubmit} />}
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

export default AddAndEditMarket;
