import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Button = styled(Link)`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  color: #511f31;
  cursor: pointer;
  padding: 10px 10px;
  min-width: 140px;
  text-align: center;
  margin-left: 20px;
  text-decoration: none;
  font-size: 18px;

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }
`;

type Props = {
  link: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const NavigationButton = ({ link, label, onClick }: Props) => {
  return (
    <Button onClick={onClick} to={link}>
      {label}
    </Button>
  );
};

export default NavigationButton;
