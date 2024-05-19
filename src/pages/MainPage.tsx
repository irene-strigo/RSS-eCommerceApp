import React from 'react';

import { useUser } from '../components/common/AuthContext';

import { Header, Footer } from '../components';
import { PageWrapper, ContentWrapper } from '../components/common';

const MainPage = () => {
  const authUser = useUser();

  const headerButtons = authUser.userId
    ? [
        { id: 1, link: '/personal-information', label: 'Personal info' },
        { id: 2, link: '/catalog', label: 'Catalog' },
        { id: 3, link: '/cart', label: 'Your cart' },
        { id: 4, link: '/about-us', label: 'About Us' },
      ]
    : [
        { id: 1, link: '/log-in-page', label: 'Log In' },
        { id: 2, link: '/sign-up-page', label: 'Sign Up' },
        { id: 3, link: '/catalog', label: 'Catalog' },
        { id: 4, link: '/cart', label: 'Your cart' },
        { id: 5, link: '/about-us', label: 'About Us' },
      ];

  return (
    <PageWrapper>
      <Header buttons={headerButtons} />
      <ContentWrapper>Main Page</ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default MainPage;
