import React from 'react';

import { Header, Footer } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
import { Button } from '../components/Header';
import { NavigationButton } from '../components/common';

const buttons: Button[] = [
  { id: 1, link: '/personal-information', label: 'Personal info' },
  { id: 2, link: '/about-us', label: 'About Us' },
  { id: 3, link: '/cart', label: 'Your cart' },
  { id: 4, link: '/main', label: 'Main Page' },
  { id: 5, link: '/log-in-page', label: 'Log In' },
  { id: 6, link: '/sign-up-page', label: 'Sign Up' },
  { id: 7, link: '/catalog', label: 'Catalog' },
];

const MainPage = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>Main Page</ContentWrapper>
      <ContentWrapper>
        {buttons.map((button) => (
          <NavigationButton key={button.id} link={button.link} label={button.label} />
        ))}
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default MainPage;
