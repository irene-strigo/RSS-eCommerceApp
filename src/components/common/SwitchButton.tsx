import { SwitchButton } from './CommonStyles';

type Props = {
  label: string;
  type: string;
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const ShowButton = ({ label, disabled, onClick }: Props) => {
  return (
    <SwitchButton disabled={disabled} onClick={onClick}>
      {label}
    </SwitchButton>
  );
};

export default ShowButton;
