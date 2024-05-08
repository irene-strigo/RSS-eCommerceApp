import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const NavigationButton = styled(Link)`
  width: 100px;
  height: 50px;
  background-color: #000;
  border-radius: 10px;
  color: #fff;
  margin-top: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
