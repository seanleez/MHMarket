import { Button, InputAdornment, TextField } from '@mui/material';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '../../assets/icon/email-icon.svg';
import PasswordIcon from '../../assets/icon/password-icon.svg';
import loginBg from '../../assets/images/login-bg.png';
import { rootURL } from '../../const/const';
import AlertDialog from '../common/dialog/AlertDialog';
import './Login.scss';

const Login: FC = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLogin = () => {
    fetch(`${rootURL}/login`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          setOpenDialog(true);
          throw new Error(`💥💥💥 Problem with URL ${res.status}`);
        }
        return res.json();
      })
      .then((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/home');
      })
      .catch((err) => console.error(err));
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
          openProp={openDialog}
          message={'Incorrect Username or Password!!!'}
          onCloseDialog={handleCloseDialog}
        />
      </div>
    </div>
  );
};

export default Login;
