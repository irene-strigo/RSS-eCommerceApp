import { ReactElement } from 'react';
import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PageWrapper from '../../components/page-wrapper/page-wrapper';
import './registr-page.css';

const RegistrationPage = (): ReactElement => {
  return (
    <div className="registration-page">
      <Header></Header>
      <PageWrapper></PageWrapper>
      <Footer></Footer>
    </div>
  );
};

export default RegistrationPage;
