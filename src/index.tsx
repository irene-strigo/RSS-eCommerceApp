import React from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import { AuthContextProvider } from './components/common';

import './style.css';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>,
);
