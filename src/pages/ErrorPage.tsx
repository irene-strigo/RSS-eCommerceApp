import React from 'react';
import { Header, Footer } from '../components';
import { ContentWrapper, ErrorMessage, PageWrapper } from './PagesStyles';

const ErrorPage = () => {
  const headerButtons = [
    { id: 1, link: '/log-in-page', label: 'Log In' },
    { id: 2, link: '/sign-up-page', label: 'Sign Up' },
    { id: 3, link: '/', label: 'Main Page' },
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
