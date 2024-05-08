import React from 'react';
import { createRoot } from 'react-dom/client';
import { getProducts } from './services/Client';
import 'normalize.css';
import MainPage from './pages/main-page/main-page';

const App = () => {
  // console.log(process.env.CTP_CLIENT_SECRET);
  getProducts().then(console.log);

  return (
    <div>
      <MainPage></MainPage>
      Hello React App
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
