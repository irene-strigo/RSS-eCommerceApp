import React from 'react';

import { NavigationButton } from '../components/common';
import { HeaderWrapper, HeaderButtonsWrapper } from './common/CommonStyles';
import { useUser } from './common/AuthContext';

export type Button = {
  id: number;
  link: string;
  label: string;
};

const Header = () => {
  const authUser = useUser();

  const headerButtons: Button[] = authUser.hasAuth
    ? [
        { id: 1, link: '/main', label: 'Main Page' },
        { id: 2, link: '/catalog', label: 'Catalog' },
        { id: 3, link: '/personal-information', label: 'Personal info' },
        { id: 4, link: '/cart', label: 'Your cart' },
        { id: 5, link: '/about-us', label: 'About Us' },
        { id: 6, link: '/logout', label: 'Logout' },
      ]
    : [
        { id: 1, link: '/log-in-page', label: 'Log In' },
        { id: 2, link: '/sign-up-page', label: 'Sign Up' },
        { id: 3, link: '/main', label: 'Main Page' },
        { id: 4, link: '/catalog', label: 'Catalog' },
        { id: 5, link: '/cart', label: 'Your cart' },
        { id: 6, link: '/about-us', label: 'About Us' },
      ];

  return (
    <HeaderWrapper>
      <HeaderButtonsWrapper>
        {headerButtons.map((button) => (
          <NavigationButton key={button.id} link={button.link} label={button.label} />
        ))}
      </HeaderButtonsWrapper>
    </HeaderWrapper>
  );
};

export default Header;
