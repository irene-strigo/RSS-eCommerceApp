import React from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css';

const App = () => {
  console.log(process.env.CTP_CLIENT_SECRET);
  return <div>Hello React App</div>;
};

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
