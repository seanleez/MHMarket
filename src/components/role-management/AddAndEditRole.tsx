import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import roleApis from '../../services/roleApis';
import AlertDialog from '../common/dialog/AlertDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import RoleForm from './RoleForm';

const AddAndEditRole = () => {
  const [pmsCategories, setPmsCategories] = useState<any[]>([]);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [errorMes, setErrorMes] = useState<string>('');
  const [currentEditRole, setCurrentEditRole] = useState<any>();

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const isAtEditPage = location.pathname.includes('/role/edit');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const res = await roleApis.getPermissionCategories();
        setPmsCategories((res as any).items);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isAtEditPage) return;
    (async () => {
      try {
        const res = await roleApis.getRole(params.id);
        setCurrentEditRole(res);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  }, []);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    navigate('/role-management');
  };

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {};
    const permissionIds: string[] = [];
    const elementsInForm = (e.target as HTMLFormElement).elements;
    [...elementsInForm].forEach((el) => {
      if (el.nodeName === 'INPUT') {
        const { type, name, value, checked, id } = el as HTMLInputElement;
        if (type === 'checkbox') {
          checked && permissionIds.push(id);
        }
        if (type === 'text') {
          payload[name] = value;
        }
        if (name === 'status') {
          payload[name] = Number(value);
        }
      }
    });

    if (!permissionIds.length) {
      setOpenAlertDialog(true);
      return;
    }

    payload['permission_ids'] = permissionIds;

    // Call API add new or update
    (async () => {
      try {
        let res;
        if (isAtEditPage) {
          res = await roleApis.updateRole(currentEditRole.role_id, payload);
        } else {
          res = await roleApis.createRole(payload);
        }
        setOpenSuccessDialog(true);
      } catch (error) {
        setErrorMes(error as string);
      }
    })();
  };

  return (
    <div className="container">
      {currentEditRole && (
        <RoleForm
          errorMes={errorMes}
          pmsCategories={pmsCategories}
          currentEditRole={currentEditRole}
          onSubmit={handleSubmit}
        />
      )}
      {!currentEditRole && (
        <RoleForm
          errorMes={errorMes}
          pmsCategories={pmsCategories}
          onSubmit={handleSubmit}
        />
      )}
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

export default AddAndEditRole;
