import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div<{
  $fontSize: string;
  $fontWeight: number;
}>`
  ${({ $fontWeight, $fontSize }) => `
      font-weight: ${$fontWeight};
      font-size: ${$fontSize};
    `}
  margin: 10px 0 10px;

  display: flex;
  align-items: center;
`;

type Props = {
  children: string | React.ReactElement;
  fontSize: string;
  fontWeight: number;
};

const Label = ({ children, fontSize, fontWeight }: Props) => {
  return (
    <Wrapper $fontSize={fontSize} $fontWeight={fontWeight}>
      {children}
    </Wrapper>
  );
};

export default Label;
