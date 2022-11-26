import { Button, InputAdornment, TextField } from '@mui/material';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '../../assets/icon/email-icon.svg';
import PasswordIcon from '../../assets/icon/password-icon.svg';
import loginBg from '../../assets/images/login-bg.png';
import authApis from '../../services/authApis';
import AlertDialog from '../common/dialog/AlertDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import './Login.scss';

const Login: FC = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const errMess = useRef('');
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleLogin = () => {
    const payload = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
    (async () => {
      try {
        const res = await authApis.postLogin(payload);
        localStorage.setItem('currentUser', JSON.stringify(res));
        setOpenSuccessDialog(true);
      } catch (error) {
        errMess.current = (error as any).message;
        setOpenAlertDialog(true);
      }
    })();
  };

  return (
    <div className="login-container">
      <img src={loginBg} alt="login-bg" />
      <div className="login-form">
        <h3 className="login__title">Login Form</h3>
        <TextField
          placeholder="Username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={EmailIcon} alt="EmailIcon" />
              </InputAdornment>
            ),
          }}
          defaultValue="CityMarketAddmin1@gmail.com"
          inputRef={usernameRef}
        />
        <br />
        <TextField
          placeholder="Password"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={PasswordIcon} alt="PasswordIcon" />
              </InputAdornment>
            ),
          }}
          defaultValue="P1@zz@2022"
          inputRef={passwordRef}
        />
        <br />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          LOGIN
        </Button>
        <AlertDialog
          openProp={openAlertDialog}
          message={errMess.current}
          onCloseDialog={handleCloseDialog}
        />
        <SuccessDialog
          openProp={openSuccessDialog}
          message={'Login Successfully'}
          onCloseDialog={() => navigate('/home')}
        />
      </div>
    </div>
  );
};

export default Login;
