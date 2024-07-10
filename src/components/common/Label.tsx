import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div<{
  $fontSize: string;
  $fontWeight: number;
  $color: string;
  $textDecor: string;
}>`
  ${({ $fontWeight, $fontSize, $color, $textDecor }) => `
      font-weight: ${$fontWeight};
      font-size: ${$fontSize};
      color: ${$color};
      text-decoration: ${$textDecor};
    `}
  margin: 10px 0 10px;
  text-align: center;
`;

type Props = {
  children: string | React.ReactElement;
  fontSize: string;
  fontWeight: number;
  color: string;
  textDecor: string;
};

const Label = ({ children, fontSize, fontWeight, color, textDecor }: Props) => {
  return (
    <Wrapper $fontSize={fontSize} $fontWeight={fontWeight} $color={color} $textDecor={textDecor}>
      {children}
    </Wrapper>
  );
};

export default Label;
