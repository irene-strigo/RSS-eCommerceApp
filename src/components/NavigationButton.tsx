import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Button = styled(Link)`
  width: 100px;
  height: 50px;
  background-color: #000;
  border-radius: 10px;
  color: #fff;
  margin-top: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  & hover {
    background-color: #fc9282;
  }
`;

type Props = {
  link: string;
  label: string;
};

const NavigationButton = ({ link, label }: Props) => {
  return <Button to={link}>{label}</Button>;
};

export default NavigationButton;
