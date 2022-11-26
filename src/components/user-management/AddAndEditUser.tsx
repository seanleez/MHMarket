import { useSnackbar } from 'notistack';
import React, { useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import userApis from '../../services/userApis';
import AlertDialog from '../common/dialog/AlertDialog';
import ErrorDialog from '../common/dialog/ErrorDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import UserForm from './UserForm';

const AddAndEditUser = () => {
  const [userRoles, setUserRoles] = useState<any>([]);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState<any>();
  const [errMessage, setErrMessage] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const isAtEditPage = location.pathname.includes('/user/edit');
  const { enqueueSnackbar } = useSnackbar();

  // Get roles and pass into select
  useLayoutEffect(() => {
    (async () => {
      try {
        const res = await userApis.getUserRoles();
        setUserRoles((res as any).items ?? []);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  }, []);

  useLayoutEffect(() => {
    if (!isAtEditPage) return;
    (async () => {
      try {
        const res = await userApis.getUser(params.id);
        setCurrentEditUser(res as any);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
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

    // Call API add new or update
    (async () => {
      try {
        if (isAtEditPage) {
          await userApis.updateUser(currentEditUser.user_id, payload);
        } else {
          await userApis.createUser(payload);
        }
        setOpenSuccessDialog(true);
      } catch (error) {
        setErrMessage(error as string);
        setOpenErrorDialog(true);
      }
    })();
  };

  return (
    <div className="container text-field-1-3">
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
