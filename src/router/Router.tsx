import { EditStallApplication } from '@modules/index';
import { useContext, useEffect, useMemo } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ApplicationList from '../components/application-list/ApplicationList';
import ApplicationView from '../components/application-list/ApplicationView';
import Header from '../components/header/Header';
import InvalidPage from '../components/invalid-page/InvalidPage';
import LandingPage from '../components/landing-page/LandingPage';
import LeaseManagement from '../components/lease-management/LeaseManagement';
import ViewMarketLease from '../components/lease-management/ViewMarketLease';
import Login from '../components/login/Login';
import AddAndEditMarketStep1 from '../components/market-management/AddAndEditMarketStep1';
import AddAndEditMarketStep2 from '../components/market-management/AddAndEditMarketStep2';
import MarketManagement from '../components/market-management/MarketManagement';
import AddAndEditRate from '../components/rate-management/AddAndEditRate';
import RateManagement from '../components/rate-management/RateManagement';
import AddAndEditRole from '../components/role-management/AddAndEditRole';
import RoleManagement from '../components/role-management/RoleManagement';
import SubmitApplication from '../components/submit-application/SubmitApplication';
import AddAndEditUser from '../components/user-management/AddAndEditUser';
import UserManagement from '../components/user-management/UserManagement';
import { AuthorContext } from '../context/AuthorContext';

interface IRoute {
  path: string;
  element: React.ReactNode;
  isPublic: boolean;
}

const Router: React.FC = () => {
  const { pathname } = useLocation();
  const authorContext = useContext(AuthorContext);

  const publicRoutes: IRoute[] = useMemo(() => {
    const permissions = authorContext?.currentUser?.permissions ?? [];
    if (permissions.length === 0) return [];
    return [
      {
        path: '/home',
        element: <LandingPage />,
        isPublic: true,
      },
      {
        path: '/role-management',
        element: <RoleManagement />,
        isPublic: permissions.includes('ROLE_MANAGEMENT'),
      },
      {
        path: '/role/add-new',
        element: <AddAndEditRole />,
        isPublic: permissions.includes('ROLE_MANAGEMENT'),
      },
      {
        path: '/role/edit/:id',
        element: <AddAndEditRole />,
        isPublic: permissions.includes('ROLE_MANAGEMENT'),
      },
      {
        path: '/user-management',
        element: <UserManagement />,
        isPublic: permissions.includes('USER_MANAGEMENT'),
      },
      {
        path: '/user/add-new',
        element: <AddAndEditUser />,
        isPublic: permissions.includes('USER_MANAGEMENT'),
      },
      {
        path: '/user/edit/:id',
        element: <AddAndEditUser />,
        isPublic: permissions.includes('USER_MANAGEMENT'),
      },
      {
        path: '/rate-management',
        element: <RateManagement />,
        isPublic: permissions.includes('RATE_MANAGEMENT'),
      },
      {
        path: '/rate/add-new',
        element: <AddAndEditRate />,
        isPublic: permissions.includes('RATE_MANAGEMENT'),
      },
      {
        path: '/rate/edit/:id',
        element: <AddAndEditRate />,
        isPublic: permissions.includes('RATE_MANAGEMENT'),
      },
      {
        path: '/market-management',
        element: <MarketManagement />,
        isPublic: permissions.includes('MARKET_VIEW'),
      },
      {
        path: '/market/add-new/step1',
        element: <AddAndEditMarketStep1 />,
        isPublic: permissions.includes('MARKET_ADD_UPDATE'),
      },
      {
        path: '/market/edit/step1/:id',
        element: <AddAndEditMarketStep1 />,
        isPublic: permissions.includes('MARKET_ADD_UPDATE'),
      },
      {
        path: '/market/add-new/step2',
        element: <AddAndEditMarketStep2 />,
        isPublic: permissions.includes('MARKET_ADD_UPDATE'),
      },
      {
        path: '/market/edit/step2/:id',
        element: <AddAndEditMarketStep2 />,
        isPublic: permissions.includes('MARKET_ADD_UPDATE'),
      },
      {
        path: '/submit-application',
        element: <SubmitApplication />,
        isPublic: permissions.includes('APPLICATION_SUBMIT'),
      },
      {
        path: '/lease-management',
        element: <LeaseManagement />,
        isPublic: true,
      },
      {
        path: '/lease-management/view/:id',
        element: <ViewMarketLease />,
        isPublic: true,
      },
      {
        path: '/application-list',
        element: <ApplicationList />,
        isPublic: permissions.includes('APPLICATION_VIEW'),
      },
      {
        path: '/application/view/:id',
        element: <ApplicationView />,
        isPublic: permissions.includes('APPLICATION_VIEW'),
      },
      {
        path: '/application/edit/:id',
        element: <EditStallApplication />,
        isPublic: permissions.includes('APPLICATION_VIEW'),
      },
      {
        path: '/application/create',
        element: <EditStallApplication />,
        isPublic: permissions.includes('APPLICATION_VIEW'),
      },
    ];
  }, [authorContext?.currentUser]);

  return (
    <>
      {pathname !== '/' && authorContext?.currentUser && <Header />}
      <Routes>
        {authorContext?.currentUser ? (
          <>
            {publicRoutes
              .filter((route: IRoute) => route.isPublic)
              .map((route: IRoute, i: number) => (
                <Route key={i} path={route.path} element={route.element} />
              ))}
            <Route path="/" element={<Navigate to="/home" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
          </>
        )}
        <Route path="*" element={<InvalidPage />} />
      </Routes>
    </>
  );
};

export default Router;
