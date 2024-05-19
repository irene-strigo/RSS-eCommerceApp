import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import {
  MainPage,
  RegistrationPage,
  ErrorPage,
  LogInPage,
  CatalogPage,
  PersonalInformationPage,
  CartPage,
  AboutUsPage,
  EmptyPage,
} from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <EmptyPage />,
  },
  {
    path: '/main',
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
    path: '/catalog',
    element: <CatalogPage />,
  },
  {
    path: '/personal-information',
    element: <PersonalInformationPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/about-us',
    element: <AboutUsPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
