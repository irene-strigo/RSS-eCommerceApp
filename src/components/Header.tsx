import React from 'react';

import styled from 'styled-components';

import { NavigationButton } from '../components/common';

const HeaderWrapper = styled.header`
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
  max-width: 350px;
  min-width: 250px;
  width: 100%;
`;

type Button = {
  id: number;
  link: string;
  label: string;
};

type Props = {
  buttons: Button[];
};

const Header = ({ buttons }: Props) => {
  return (
    <HeaderWrapper>
      <Wrapper>
        {buttons.map((button) => (
          <NavigationButton key={button.id} link={button.link} label={button.label} />
        ))}
      </Wrapper>
    </HeaderWrapper>
  );
};

export default Header;
