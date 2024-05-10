import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { MainPage, RegistrationPage, ErrorPage, LogInPage } from './pages';

export const router = createBrowserRouter([
  {
    path: '/main-page',
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
    path: '*',
    element: <ErrorPage />,
  },
]);
