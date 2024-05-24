import { Input } from './common';
import {
  AddressContainer,
  CheckboxesWrapper,
  DefaultCheckboxLabel,
  SwitchButton,
} from './common/CommonStyles';

type Props = {
  children: React.ReactElement | React.ReactElement[];
  label: string;
  type: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};
const lables = ['billing', 'shipping', 'default billing', 'default shipping'];

const Address = ({ children, onChange }: Props) => {
  return (
    <AddressContainer>
      {children}

      {lables.map((label, idx) => (
        <CheckboxesWrapper key={`addr_field_${idx}`}>
          <DefaultCheckboxLabel>
            {label}
            <Input
              name={label}
              type={label === 'billing' || label === 'shipping' ? 'checkbox' : 'radio'}
              onChange={onChange}
            />
          </DefaultCheckboxLabel>
        </CheckboxesWrapper>
      ))}
      <SwitchButton>delete</SwitchButton>
    </AddressContainer>
  );
};

export default Address;
