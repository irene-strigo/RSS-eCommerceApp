import React from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import './style.css';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<RouterProvider router={router} />);
