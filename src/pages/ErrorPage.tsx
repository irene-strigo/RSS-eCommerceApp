import React from 'react';

import { Header, Footer } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
import { ErrorMessage } from '../components/common/CommonStyles';

const ErrorPage = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper $alignItems={'center'}>
        <ErrorMessage>Oops! Something went wrong!</ErrorMessage>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default ErrorPage;
