import { lazy, useMemo } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Loadable from '../views/components/loader/Loadable';
import { ModuleType, dynamicRoutes } from '../helper/GlobalHelper';

const LoginPage = Loadable(lazy(() => import('../views/pages/auth/login')));
const WebLayout = Loadable(lazy(() => import('../views/layouts/WebLayout')));
const PlainLayout = Loadable(lazy(() => import('../views/layouts/PlainLayout')));

const ForgotPassword = Loadable(lazy(() => import('../views/pages/auth/forgot-password')));
const Register = Loadable(lazy(() => import('../views/pages/auth/register')));
const ResetPassword = Loadable(lazy(() => import('../views/pages/auth/reset-password')));
const NotFound = Loadable(lazy(() => import('../views/pages/not-found')));
const UnAuthorised = Loadable(lazy(() => import('../views/pages/un-authorised')));
const DemoFields = Loadable(lazy(() => import('views/pages/demo')));

export default function Router({ permission }: { permission?: ModuleType[] }) {
  const route = useMemo(() => {
    return [
      {
        path: 'un-authorised',
        element: <UnAuthorised />,
      },
      {
        path: '/auth',
        element: (
          <PlainLayout>
            <Outlet />
          </PlainLayout>
        ),
        children: [
          { path: 'login', index: true, element: <LoginPage /> },
          { path: 'register', element: <Register /> },
          { path: 'reset-password', element: <ResetPassword /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
        ],
      },
      {
        path: '/',
        element: (
          <WebLayout>
            <Outlet />
          </WebLayout>
        ),
        children: permission ? dynamicRoutes(permission) : dynamicRoutes(),
      },
      {
        path: '404',
        element: <NotFound />,
      },

      {
        path: 'demo-development-fields',
        element: <DemoFields />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ];
  }, [permission]);
  const routes = useRoutes(route);

  return routes;
}
