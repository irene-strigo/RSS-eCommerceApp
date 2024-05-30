import { Input } from './common';
import {
  AddressContainer,
  AddressFieldContainer,
  CheckboxesWrapper,
  DefaultCheckboxLabel,
  SwitchButton,
} from './common/CommonStyles';
import { _BaseAddress } from '@commercetools/platform-sdk';
import ShowButton from './common/SwitchButton';
import { COUNTRIES } from '../Countries';

type Props = {
  idx: number;
  address: _BaseAddress;
  isBilling: boolean;
  isShipping: boolean;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  onEditClick: (addressId?: string) => void;
  onBillingChange: (addressId?: string) => void;
  onShippingChange: (addressId?: string) => void;
  onDefaultBillingChange: (addressId?: string) => void;
  onDefaultShippingChange: (addressId?: string) => void;
  onDeleteClick: (addressId?: string) => void;
};

type Selectors = {
  label: string;
  type: 'checkbox' | 'radio';
  checked: (props: Props) => boolean;
  onChange: (props: Props) => (addressId?: string) => void;
};

const inputs: Selectors[] = [
  {
    label: 'billing',
    type: 'checkbox',
    checked: (props: Props) => props.isBilling,
    onChange: (props: Props) => props.onBillingChange,
  },
  {
    label: 'shipping',
    type: 'checkbox',
    checked: (props: Props) => props.isShipping,
    onChange: (props: Props) => props.onShippingChange,
  },
  {
    label: 'default billing',
    type: 'radio',
    checked: (props: Props) => props.isDefaultBilling,
    onChange: (props: Props) => props.onDefaultBillingChange,
  },
  {
    label: 'default shipping',
    type: 'radio',
    checked: (props: Props) => props.isDefaultShipping,
    onChange: (props: Props) => props.onDefaultShippingChange,
  },
];

const Address = (props: Props) => {
  const { address } = props;
  const addressString = [
    address.postalCode,
    COUNTRIES.find((c) => c.code === address.country)?.label,
    address.city,
    address.streetName,
  ].join(', ');

  return (
    <AddressContainer key={`address_${address.id}`}>
      <AddressFieldContainer>{addressString}</AddressFieldContainer>
      <ShowButton
        disabled={false}
        label={'edit'}
        onClick={(evt) => {
          evt.preventDefault();
          props.onEditClick(address.id);
        }}
        type={'button'}
      />
      {inputs.map((input, idx) => (
        <CheckboxesWrapper key={`addr_field_${idx}`}>
          <DefaultCheckboxLabel>
            {input.label}
            <Input
              name={input.label}
              checked={input.checked(props)}
              type={input.type}
              onChange={(evt) => {
                evt.preventDefault();
                input.onChange(props)(address.id);
              }}
            />
          </DefaultCheckboxLabel>
        </CheckboxesWrapper>
      ))}
      <SwitchButton
        onClick={(evt) => {
          evt.preventDefault();
          props.onDeleteClick(address.id);
        }}
      >
        delete
      </SwitchButton>
    </AddressContainer>
  );
};

export default Address;
