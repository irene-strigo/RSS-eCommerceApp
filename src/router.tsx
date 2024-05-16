import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { MainPage, RegistrationPage, ErrorPage, LogInPage } from './pages';
import AddressPage from './pages/AddressPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/log-in-page',
    element: <LogInPage />,
  },
  {
    path: '/sign-up-page',
    element: <RegistrationPage />,
  },
  {
    path: '/sign-up-shipping-address',
    element: <AddressPage mode="Shipping" />,
  },
  {
    path: '/sign-up-billing-address',
    element: <AddressPage mode="Billing" />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
