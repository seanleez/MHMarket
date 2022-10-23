import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { rootURL } from '../../const/const';
import AlertDialog from '../common/dialog/AlertDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import RateForm from './RateForm';

const AddAndEditRate = () => {
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [currentEditRate, setCurrentEditRate] = useState<any>();

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const isAtEditPage = location.pathname.includes('/rate/edit');
  const token = JSON.parse(
    localStorage.getItem('currentUser') ?? ''
  )?.access_token;

  useEffect(() => {
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

    // Get value from form and assign them to payload
    let elementsInForm = (e.target as HTMLFormElement).elements;
    [...elementsInForm].forEach((el) => {
      if (el.nodeName === 'INPUT') {
        const { value, name } = el as HTMLInputElement;

        if (rateType === 2) {
          if (!payload.hasOwnProperty('security_bond')) {
            payload['security_bond'] = {};
          }
          if (['amount', 'rental_fee'].includes(name)) {
            payload['security_bond'][name] = Number(value);
          }
        }

        if (rateType === 3) {
          if (!payload.hasOwnProperty('other_rate')) {
            payload['other_rate'] = {};
          }
          if (['detail', 'amount'].includes(name)) {
            payload['other_rate'][name] = Number(value);
          }
        }

        if (name === 'rate_id') {
          payload[name] = value;
        }
        if (['type', 'status'].includes(name)) {
          payload[name] = Number(value);
        }
      }
    });
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
          throw new Error(response.error_code);
        } else {
          setOpenSuccessDialog(true);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="form-container">
      {currentEditRate && (
        <RateForm currentEditRate={currentEditRate} onSubmit={handleSubmit} />
      )}
      {!currentEditRate && <RateForm onSubmit={handleSubmit} />}
      <AlertDialog
        openProp={openAlertDialog}
        message={'Choose at least one permission'}
        onCloseDialog={handleCloseAlertDialog}
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
