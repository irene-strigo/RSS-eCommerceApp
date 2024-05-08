import { ReactElement } from 'react';
import './main-page.css';
import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PageWrapper from '../../components/page-wrapper/page-wrapper';
import './main-page.css';

const MainPage = (): ReactElement => {
  return (
    <div className="main-page">
      <Header></Header>
      <PageWrapper items={undefined}></PageWrapper>
      <Footer></Footer>
    </div>
  );
};

export default MainPage;
