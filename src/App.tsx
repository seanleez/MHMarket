import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header';
import LandingPage from './components/landing-page/LandingPage';
import Login from './components/login/Login';
import AddAndEditRole from './components/role-management/AddAndEditRole';
import RoleManagement from './components/role-management/RoleManagement';
import AddAndEditUser from './components/user-management/AddAndEditUser';
import UserManagement from './components/user-management/UserManagement';

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/role-management" element={<RoleManagement />} />
        <Route path="/role/add-new" element={<AddAndEditRole />} />
        <Route path="/role/edit/:id" element={<AddAndEditRole />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/user/add-new" element={<AddAndEditUser />} />
        <Route path="/user/edit/:id" element={<AddAndEditUser />} />

        <Route path="*" element={<h1>Page not found !!!</h1>} />
      </Routes>
      {/* {pathname !== '/' && <Footer />} */}
    </div>
  );
}

export default App;
