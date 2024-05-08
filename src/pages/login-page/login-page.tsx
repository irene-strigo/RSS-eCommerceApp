import { ReactElement } from 'react';
import './main-page.css';
import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PageWrapper from '../../components/page-wrapper/page-wrapper';
import './login-page.css';
//import Form from '../../components/form/form';

const LoginPage = (): ReactElement => {
  return (
    <div className="login-page">
      <Header></Header>
      <PageWrapper></PageWrapper>
      <Footer></Footer>
    </div>
  );
};

export default LoginPage;
