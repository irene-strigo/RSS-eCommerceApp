import React from 'react';

import styled from 'styled-components';

import { NavigationButton } from '../components';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 10px;
`;

const Header = () => {
  const buttons = [
    { id: 1, link: '/log-in-page', label: 'Log In' },
    { id: 2, link: '/sign-up-page', label: 'Sign Up' },
    { id: 3, link: '/main-page', label: 'Main Page' },
  ];

  return (
    <HeaderWrapper>
      {buttons.map((button) => (
        <NavigationButton key={button.id} link={button.link} label={button.label} />
      ))}
    </HeaderWrapper>
  );
};

export default Header;
