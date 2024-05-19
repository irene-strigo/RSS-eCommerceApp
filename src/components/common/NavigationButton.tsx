import { NavButton } from './CommonStyles';

type Props = {
  link: string;
  label: string;
};

const NavigationButton = ({ link, label }: Props) => {
  return <NavButton to={link}>{label}</NavButton>;
};

export default NavigationButton;
