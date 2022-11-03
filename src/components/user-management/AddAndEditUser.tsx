import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { rootURL } from '../../const/const';
import AlertDialog from '../common/dialog/AlertDialog';
import ErrorDialog from '../common/dialog/ErrorDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import '../Form.scss';
import UserForm from './UserForm';

const AddAndEditUser = () => {
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState<any>();
  const [errMessage, setErrMessage] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const isAtEditPage = location.pathname.includes('/user/edit');
  const token = JSON.parse(
    localStorage.getItem('currentUser') ?? ''
  )?.access_token;

  // Get roles and pass into select
  useEffect(() => {
    fetch(`${rootURL}/roles`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserRoles(data.items);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (isAtEditPage) {
      fetch(`${rootURL}/users/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCurrentEditUser(data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    navigate('/user-management');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {};
    const userRoles: string[] = [];
    let elementsInForm = (e.target as HTMLFormElement).elements;
    [...elementsInForm].forEach((el) => {
      if (el.nodeName === 'INPUT') {
        const element = el as HTMLInputElement;
        if (element.type === 'checkbox') {
          element.checked && userRoles.push(element.id);
        }
        if (element.type === 'text') {
          payload[element.name] = element.value;
        }
        if (element.name === 'status') {
          payload[element.name] = Number(element.value);
        }
      }
    });

    if (!userRoles.length) {
      setOpenAlertDialog(true);
      return;
    }
    payload['role_ids'] = userRoles;
    payload['market_codes'] = [];

    // Call API Add New
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    const token = currentUser?.access_token;

    const fetchURL = isAtEditPage
      ? `${rootURL}/users/${currentEditUser.user_id}`
      : `${rootURL}/users`;

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
          setErrMessage(response.error_code);
          setOpenErrorDialog(true);
        } else {
          setOpenSuccessDialog(true);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="form-container text-field-1-3">
      {currentEditUser && (
        <UserForm
          currentEditUser={currentEditUser}
          userRoles={userRoles}
          onSubmit={handleSubmit}
        />
      )}
      {!currentEditUser && (
        <UserForm userRoles={userRoles} onSubmit={handleSubmit} />
      )}
      <AlertDialog
        openProp={openAlertDialog}
        message={'Choose at least one user role'}
        onCloseDialog={() => setOpenAlertDialog(false)}
      />
      <ErrorDialog
        openProp={openErrorDialog}
        message={errMessage}
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

export default AddAndEditUser;
