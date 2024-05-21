import { SwitchButton } from './CommonStyles';

type Props = {
  label: string;
  type: 'button';
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const ShowButton = ({ label, type, disabled, onClick }: Props) => {
  return (
    <SwitchButton type={type} disabled={disabled} onClick={onClick}>
      {label}
    </SwitchButton>
  );
};

export default ShowButton;
