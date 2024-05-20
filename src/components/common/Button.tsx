import { Button } from './CommonStyles';

type Props = {
  label: string;
};

const SubmitButton = ({ label }: Props) => {
  return <Button>{label}</Button>;
};

export default SubmitButton;
