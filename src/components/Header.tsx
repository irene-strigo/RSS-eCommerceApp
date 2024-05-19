import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { useUser } from './common/AuthContext';

import { NavigationButton } from '../components/common';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 85px;
  padding: 20px 40px;
  background-color: #d8e1ff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  width: 100%;
`;

type Button = {
  id: number;
  link: string;
  label: string;
  onClick?: () => void;
};

type Props = {
  buttons: Button[];
};

const Header = ({ buttons }: Props) => {
  const authUser = useUser();

  const navigate = useNavigate();

  const handleClick = () => {
    authUser.logOut();

    authUser.setUserId('');
    navigate('/main');
  };

  const headerButtons = authUser.userId
    ? [
        ...buttons,
        { id: buttons.length + 1, link: '/main', label: 'Log Out', onClick: handleClick },
      ]
    : buttons;

  return (
    <HeaderWrapper>
      <Wrapper>
        {headerButtons.map((headerButton) => (
          <NavigationButton
            key={headerButton.id}
            link={headerButton.link}
            label={headerButton.label}
            onClick={() => (headerButton.onClick ? headerButton.onClick() : null)}
          />
        ))}
      </Wrapper>
    </HeaderWrapper>
  );
};

export default Header;
