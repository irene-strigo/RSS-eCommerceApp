import React from 'react';

import styled from 'styled-components';

import { Header, Footer } from '../components';
import { PageWrapper, ContentWrapper } from '../components/common';

const ErrorMessage = styled.div`
  margin: auto;
  font-size: 25px;
`;

const ErrorPage = () => {
  const headerButtons = [
    { id: 1, link: '/log-in-page', label: 'Log In' },
    { id: 2, link: '/sign-up-page', label: 'Sign Up' },
    { id: 3, link: '/main', label: 'Main Page' },
  ];

  return (
    <PageWrapper>
      <Header buttons={headerButtons} />
      <ContentWrapper>
        <ErrorMessage>Oops! Something went wrong!</ErrorMessage>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default ErrorPage;
