import styled from 'styled-components';

const Button = styled.button`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  color: #511f31;
  cursor: pointer;
  padding: 3px 3px;
  font-size: 10px;
  margin: 10px;

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }
  &:disabled {
    background-color: #c0c0c0;
    color: black;
  }
`;

type Props = {
  label: string;
  type: 'button';
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const ShowButton = ({ label, type, disabled, onClick }: Props) => {
  return (
    <Button type={type} disabled={disabled} onClick={onClick}>
      {label}
    </Button>
  );
};

export default ShowButton;
