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
  AddressPage,
} from './pages';
import LogoutPage from './pages/LogoutPage';

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
    path: '/sign-up-shipping-address',
    element: <AddressPage mode="Shipping" />,
  },
  {
    path: '/sign-up-billing-address',
    element: <AddressPage mode="Billing" />,
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
    path: '/logout',
    element: <LogoutPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
