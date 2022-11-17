import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthorContextProvider from './context/AuthorContext';
import ContainerContextProvider from './context/ContainerRefContext';
import FloorContextProvider from './context/FloorContext';
import './index.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </React.StrictMode>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        variant="error"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <FloorContextProvider>
          <ContainerContextProvider>
            <App />
          </ContainerContextProvider>
        </FloorContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </LocalizationProvider>
);
