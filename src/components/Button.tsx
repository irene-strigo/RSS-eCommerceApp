import styled from 'styled-components';

const Button = styled.button`
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
  label: string;
  onSubmit: () => void;
};

const NavigationButton = ({ label, onSubmit }: Props) => {
  return <Button onSubmit={onSubmit}>{label}</Button>;
};

export default NavigationButton;
