import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MARKET_TYPE, rootURL } from '../../const/const';
import AlertDialog from '../common/dialog/AlertDialog';
import ErrorDialog from '../common/dialog/ErrorDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import MarketFormStep1 from './MarketFormStep1';

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

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
  const marketId = localStorage.getItem('marketId') ?? '';

  useEffect(() => {
    if (!marketId) return;
    fetch(`${rootURL}/markets/${marketId}?draft=true`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        supervisorId.current = response?.supervisor?.supervisor_id ?? '';
        setCurrentEditMarket(response);
      })
      .catch((err) => console.error(err));
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

    if (marketId) {
      payload.supervisor['supervisor_id'] = supervisorId.current;
      payload['market_id'] = marketId;
    }
    console.log(payload);

    // Call API Add New or Edit
    const fetchURL = marketId
      ? `${rootURL}/markets/${marketId}`
      : `${rootURL}/markets`;

    fetch(fetchURL, {
      method: marketId ? 'PUT' : 'POST',
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
          console.log(response);
          const id = marketId ? response.market_id : response.id;
          response && localStorage.setItem('marketId', id);
          setOpenSuccessDialog(true);
        }
      })
      .catch((err) => {
        setOpenErrorDialog(true);
      });
  };

  return (
    <div className="container text-field-1-4">
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
        message={`${marketId ? 'Update' : 'Create'} Successfully!`}
        onCloseDialog={handleCloseSuccessDialog}
      />
    </div>
  );
};

export default AddAndEditMarketStep1;
