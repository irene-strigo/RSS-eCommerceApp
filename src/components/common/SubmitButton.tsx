import styled from 'styled-components';

const Button = styled.button`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  color: #511f31;
  cursor: pointer;
  padding: 10px 10px;
  font-size: 18px;

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }
`;

type Props = {
  label: string;
};

const SubmitButton = ({ label }: Props) => {
  return <Button>{label}</Button>;
};

export default SubmitButton;
