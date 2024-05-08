import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/main-page');
  }, []);

  return (
    <HeaderWrapper>
      <NavigationButton to={'/log-in-page'}>Log In</NavigationButton>
      <NavigationButton to={'/sign-up-page'}>Sign Up</NavigationButton>
      <NavigationButton to={'/main-page'}>Main Page</NavigationButton>
    </HeaderWrapper>
  );
};

export default Header;
