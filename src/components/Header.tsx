import React from 'react';

import { NavigationButton } from '../components/common';
import { HeaderWrapper, HeaderButtonsWrapper } from './common/CommonStyles';

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
      <HeaderButtonsWrapper>
        {buttons.map((button) => (
          <NavigationButton key={button.id} link={button.link} label={button.label} />
        ))}
      </HeaderButtonsWrapper>
    </HeaderWrapper>
  );
};

export default Header;
