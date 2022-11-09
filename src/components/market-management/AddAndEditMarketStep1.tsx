import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MARKET_TYPE, rootURL } from '../../const/const';
import AlertDialog from '../common/dialog/AlertDialog';
import ErrorDialog from '../common/dialog/ErrorDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import MarketFormStep1 from './MarketFormStep1';

const AddAndEditMarketStep1 = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [currentEditMarket, setCurrentEditMarket] = useState<any>();

  const errorMes = useRef<string>('');
  const supervisorId = useRef<string>('');

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
          supervisorId.current = data?.supervisor?.supervisor_id ?? '';
          setCurrentEditMarket(data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    isAtEditPage
      ? navigate(`/market/edit/step2/${params.id}`)
      : navigate('/market/add-new/step2');
  };

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      location: {},
      supervisor: {},
    };

    let elementsInForm = (e.target as HTMLFormElement).elements;
    [...elementsInForm].forEach((el) => {
      if (el.nodeName === 'INPUT' && (el as HTMLInputElement).name) {
        const { type, name, value } = el as HTMLInputElement;
        if (type === 'text') {
          if (['address', 'city', 'province', 'ward'].includes(name)) {
            payload.location[name] = value;
          } else if (
            [
              'email',
              'first_name',
              'last_name',
              'middle_name',
              'mobile_phone',
              'position',
              'telephone',
            ].includes(name)
          ) {
            payload.supervisor[name] = value;
          } else {
            payload[name] = value;
          }
        }
        if (['status', 'clazz'].includes(name)) {
          payload[name] = Number(value);
        }
        if (name === 'type') {
          payload[name] =
            MARKET_TYPE.find((item: any) => item.value === value)?.type ?? 1;
        }
      }
    });

    if (isAtEditPage) {
      payload.supervisor['supervisor_id'] = supervisorId.current;
      payload['market_id'] = currentEditMarket?.market_id;
    }
    console.log(payload);

    // Call API Add New or Edit
    const fetchURL = isAtEditPage
      ? `${rootURL}/markets/${currentEditMarket.market_id}`
      : `${rootURL}/markets`;

    fetch(fetchURL, {
      method: isAtEditPage ? 'PUT' : 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error_code) {
          errorMes.current = response?.errors?.type ?? 'Error';
          throw new Error(response);
        } else {
          response && localStorage.setItem('marketId', response.market_id);
          setOpenSuccessDialog(true);
        }
      })
      .catch((err) => {
        setOpenErrorDialog(true);
      });
  };

  return (
    <div className="form-container text-field-1-4">
      {currentEditMarket && (
        <MarketFormStep1
          currentEditMarket={currentEditMarket}
          onSubmit={handleSubmit}
        />
      )}
      {!currentEditMarket && <MarketFormStep1 onSubmit={handleSubmit} />}
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

export default AddAndEditMarketStep1;
