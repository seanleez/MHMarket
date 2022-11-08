import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Canvas from './components/drag-and-drop-stall/Canvas';
import Header from './components/header/Header';
import LandingPage from './components/landing-page/LandingPage';
import Login from './components/login/Login';
import AddAndEditMarket from './components/market-management/AddAndEditMarket';
import MarketManagement from './components/market-management/MarketManagement';
import AddAndEditRate from './components/rate-management/AddAndEditRate';
import RateManagement from './components/rate-management/RateManagement';
import AddAndEditRole from './components/role-management/AddAndEditRole';
import RoleManagement from './components/role-management/RoleManagement';
import AddAndEditUser from './components/user-management/AddAndEditUser';
import UserManagement from './components/user-management/UserManagement';

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      <Canvas />
      {/* {pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
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
        <Route path="/market/add-new" element={<AddAndEditMarket />} />
        <Route path="/market/edit/:id" element={<AddAndEditMarket />} />

        <Route path="*" element={<h1>Page not found !!!</h1>} />
      </Routes> */}
      {/* {pathname !== '/' && <Footer />} */}
    </div>
  );
}

export default App;
