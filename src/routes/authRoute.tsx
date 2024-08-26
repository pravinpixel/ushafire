/**
 * This file is part of AutoPack.
 *
 * Its is Route which did't have token
 *
 */
import { lazy } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import LoginPage from '../views/pages/auth/login';
import PlainLayout from '../views/layouts/PlainLayout';
import Loadable from '../views/components/loader/Loadable';

const ForgotPassword = Loadable(lazy(() => import('../views/pages/auth/forgot-password')));
const Register = Loadable(lazy(() => import('../views/pages/auth/register')));
const ResetPassword = Loadable(lazy(() => import('../views/pages/auth/reset-password')));
const UnAuthorised = Loadable(lazy(() => import('../views/pages/un-authorised')));
const DemoFields = Loadable(lazy(() => import('views/pages/demo')));

export default function AuthRouter() {
  const routes = useRoutes([
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
      path: 'un-authorised',
      element: <UnAuthorised />,
    },
    {
      path: 'demo-development-fields',
      element: <DemoFields />,
    },
    {
      path: '*',
      element: <Navigate to="/auth/login" replace />,
    },
  ]);

  return routes;
}
