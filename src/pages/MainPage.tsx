import React from 'react';

import { Header, Footer } from '../components';
import { PageWrapper, ContentWrapper } from '../components/common';

const MainPage = () => {
  const headerButtons = [
    { id: 1, link: '/log-in-page', label: 'Log In' },
    { id: 2, link: '/sign-up-page', label: 'Sign Up' },
  ];

  return (
    <>
      <PageWrapper>
        <Header buttons={headerButtons} />
        <ContentWrapper>Main Page</ContentWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default MainPage;
