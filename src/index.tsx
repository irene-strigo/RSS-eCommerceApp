import React from 'react';
import { createRoot } from 'react-dom/client';
import { getProducts } from './services/Client';
import 'normalize.css';
//import RegistrationPage from './pages/registr-page/registr-page';
//import MainPage from './pages/main-page/main-page';
import LoginPage from './pages/login-page/login-page';

const App = () => {
  // console.log(process.env.CTP_CLIENT_SECRET);
  getProducts().then(console.log);

  return (
    <div className="app-wrapper">
      <LoginPage></LoginPage>
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
