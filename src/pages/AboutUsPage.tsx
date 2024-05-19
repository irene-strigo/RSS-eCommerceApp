import React from 'react';

import { Header, Footer } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';

const AboutUsPage = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>About US</ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default AboutUsPage;
