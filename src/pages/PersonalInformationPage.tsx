import React from 'react';

import { Header, Footer } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';

const PersonalInformationPage = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>Your personal information</ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default PersonalInformationPage;
