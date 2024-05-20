import React from 'react';

import { Header, Footer } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';

const MainPage = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>Main Page</ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default MainPage;
