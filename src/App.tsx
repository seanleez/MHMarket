import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import LandingPage from './components/landing-page/LandingPage';
import LeaseManagement from './components/lease-management/LeaseManagement';
import ViewMarketLease from './components/lease-management/ViewMarketLease';
import Login from './components/login/Login';
import AddAndEditMarketStep1 from './components/market-management/AddAndEditMarketStep1';
import AddAndEditMarketStep2 from './components/market-management/AddAndEditMarketStep2';
import MarketManagement from './components/market-management/MarketManagement';
import AddAndEditRate from './components/rate-management/AddAndEditRate';
import RateManagement from './components/rate-management/RateManagement';
import AddAndEditRole from './components/role-management/AddAndEditRole';
import RoleManagement from './components/role-management/RoleManagement';
import SubmitApplication from './components/submit-application/SubmitApplication';
import AddAndEditUser from './components/user-management/AddAndEditUser';
import UserManagement from './components/user-management/UserManagement';
import ApplicationList from './components/application-list/ApplicationList';
import ApplicationView from './components/application-list/ApplicationView';
import './style/main.scss';
import InvalidPage from './components/invalid-page/InvalidPage';
import { useContext } from 'react';
import { AuthorContext } from './context/AuthorContext';

function App() {
  const { pathname } = useLocation();
  const authorContext = useContext(AuthorContext);

  return (
    <div className="App">
      {pathname !== '/' && authorContext?.currentUser && <Header />}
      <Routes>
        {authorContext?.currentUser ? (
          <>
            <Route path="/home" element={<LandingPage />} />

            <Route path="/role-management" element={<RoleManagement />} />
            <Route path="/role/add-new" element={<AddAndEditRole />} />
            <Route path="/role/edit/:id" element={<AddAndEditRole />} />

            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/user/add-new" element={<AddAndEditUser />} />
            <Route path="/user/edit/:id" element={<AddAndEditUser />} />

            <Route path="/rate-management" element={<RateManagement />} />
            <Route path="/rate/add-new" element={<AddAndEditRate />} />
            <Route path="/rate/edit/:id" element={<AddAndEditRate />} />

            <Route path="/market-management" element={<MarketManagement />} />
            <Route
              path="/market/add-new/step1"
              element={<AddAndEditMarketStep1 />}
            />
            <Route
              path="/market/edit/step1/:id"
              element={<AddAndEditMarketStep1 />}
            />
            <Route
              path="/market/add-new/step2"
              element={<AddAndEditMarketStep2 />}
            />
            <Route
              path="/market/edit/step2/:id"
              element={<AddAndEditMarketStep2 />}
            />
            <Route path="/submit-application" element={<SubmitApplication />} />

            <Route path="/lease-management" element={<LeaseManagement />} />
            <Route
              path="/lease-management/view/:id"
              element={<ViewMarketLease />}
            />
            <Route path="/application-list" element={<ApplicationList />} />
            <Route path="/application/view/:id" element={<ApplicationView />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
          </>
        )}
        <Route path="*" element={<InvalidPage />} />
      </Routes>
    </div>
  );
}

export default App;
