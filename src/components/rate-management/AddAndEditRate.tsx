import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { rootURL } from '../../const/const';
import AlertDialog from '../common/dialog/AlertDialog';
import ErrorDialog from '../common/dialog/ErrorDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import RateForm from './RateForm';

const AddAndEditRate = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [currentEditRate, setCurrentEditRate] = useState<any>();

  const errorMes = useRef<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const isAtEditPage = location.pathname.includes('/rate/edit');

  const currentUser = localStorage.getItem('currentUser') ? 
    JSON.parse(localStorage.getItem('currentUser') as string) : 
    null;
  const token = currentUser?.access_token;


  useLayoutEffect(() => {
    if (isAtEditPage) {
      fetch(`${rootURL}/rates/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCurrentEditRate(data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    navigate('/rate-management');
  };

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleSubmit = (e: React.FormEvent, rateType: number) => {
    e.preventDefault();
    const payload: any = {};
    let tempObj: any = {};
    let currentIndex = 0;
    let flag = false;

    // Get value from form and assign them to payload
    let elementsInForm = (e.target as HTMLFormElement).elements;
    [...elementsInForm].forEach((el) => {
      if (el.nodeName === 'INPUT') {
        const { name, value } = el as HTMLInputElement;

        switch (rateType) {
          case 0:
          case 1:
            const propertyRate = rateType === 0 ? 'rental_rate' : 'rights_rate';
            const subPropertyRate =
              rateType === 0 ? 'class_rental_amounts' : 'class_rights_amounts';
            if (!payload.hasOwnProperty(propertyRate)) {
              payload[propertyRate] = {
                [subPropertyRate]: [],
              };
            }
            if (name.includes('clazz') || name.includes('amount')) {
              if (currentIndex !== Number(name.split('-')[1])) {
                tempObj = {};
                currentIndex = Number(name.split('-')[1]);
              }
              tempObj[`${name.split('-')[0]}`] = Number(value);
              if (
                tempObj.hasOwnProperty('clazz') &&
                tempObj.hasOwnProperty('amount')
              ) {
                payload[propertyRate][subPropertyRate].push(tempObj);
              }
            }

            const checkClassArray = payload[propertyRate][subPropertyRate].map(
              (item: any) => item.clazz
            );
            if (checkClassArray.length > 1) {
              checkClassArray.forEach((element: any) => {
                const appearTime = checkClassArray.filter(
                  (item: any) => item === element
                ).length;
                if (appearTime > 1) {
                  flag = true;
                  setOpenAlertDialog(true);
                }
              });
            }
            break;

          case 2:
            if (!payload.hasOwnProperty('security_bond')) {
              payload['security_bond'] = {};
            }
            if (['amount', 'rental_fee'].includes(name)) {
              payload['security_bond'][name] = Number(value);
            }
            break;

          case 3:
            if (!payload.hasOwnProperty('other_rate')) {
              payload['other_rate'] = {};
            }
            if (['detail', 'amount'].includes(name)) {
              payload['other_rate'][name] = Number(value);
            }
            break;
          default:
            break;
        }

        if (['type', 'status'].includes(name)) {
          payload[name] = Number(value);
        }
      }
    });

    if (flag) return;
    console.log(payload);

    // Call API Add New or Edit
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    const token = currentUser?.access_token;

    const fetchURL = isAtEditPage
      ? `${rootURL}/rates/${currentEditRate.rate_id}`
      : `${rootURL}/rates`;

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
          setOpenSuccessDialog(true);
        }
      })
      .catch((err) => {
        console.dir(err);
        setOpenErrorDialog(true);
      });
  };

  return (
    <div className="form-container text-field-1-3">
      {currentEditRate && (
        <RateForm currentEditRate={currentEditRate} onSubmit={handleSubmit} />
      )}
      {!currentEditRate && <RateForm onSubmit={handleSubmit} />}
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

export default AddAndEditRate;
