import { Header, Footer } from '../components';
import { PageWrapper } from '../components/common';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { useState } from 'react';
import { _BaseAddress } from '@commercetools/platform-sdk';
import { setCustomerAddress } from '../services/Client';
import { COUNTRIES } from '../components/Countries';
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  width: 100%;

  & button {
    margin-top: 30px;
    width: 95px;
  }

  & fieldset {
    width: 100%;
    margin: 15px 0 15px;
  }
`;
const InputElem = styled.input`
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  color: #39739d;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;

  &:focus {
    outline: none;
    border: 2px solid #39739d;
  }
`;

const DefaultCheckboxLabel = styled.label`
  font-size: 13px;
  display: flex;
  gap: 7px;
`;

const SelectElem = styled.select`
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  color: #39739d;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;

  &:focus {
    outline: none;
    border: 2px solid #39739d;
  }
`;

const ButtonSubmit = styled.button`
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
  &:disabled {
    background-color: #c0c0c0;
    color: black;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #f7f9ff;
  width: 100%;

  padding: 20px;
  font-size: 20px;
`;

const ErrorsText = styled.p`
  color: red;
  font-size: 13px;
`;

export type AddressPageProps = {
  mode: 'Billing' | 'Shipping';
};

export default function AddressPage({ mode }: AddressPageProps) {
  const headerButtons = [
    { id: 1, link: '/log-in-page', label: 'Log In' },
    { id: 2, link: '/', label: 'Main Page' },
  ];
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<_BaseAddress>({ mode: 'onChange' });

  const [useAsDefaultAddress, setUseAsDefaultAddress] = useState(false);
  const [addBillingAddress, setAddBillingAddress] = useState(false);
  const navigate = useNavigate();

  console.log(mode);

  const onSubmit: SubmitHandler<_BaseAddress> = async (data) => {
    console.log('draft', data);
    const customerId = localStorage.getItem('signUpCustomerId');
    const version = Number(localStorage.getItem('signUpCustomerVersion')) || 0;
    if (!customerId) {
      return;
    }
    const customer = await setCustomerAddress(customerId, version, mode, data, useAsDefaultAddress);
    if (customer && customer.id) {
      console.log('customer', customer);
      localStorage.setItem('signUpCustomerVersion', String(customer.version));
      reset();
      if (mode === 'Shipping' && addBillingAddress) {
        navigate(`/sign-up-billing-address`);
      } else {
        navigate(`/`);
      }
    }
  };

  return (
    <>
      <PageWrapper>
        <Header buttons={headerButtons} />
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Container>
              <fieldset>
                <legend>{mode} address</legend>

                <DefaultCheckboxLabel>
                  <input
                    type={'checkbox'}
                    onChange={(e) => setUseAsDefaultAddress(e.target.checked)}
                  />
                  Make it default
                </DefaultCheckboxLabel>

                <label>Country: </label>
                <SelectElem
                  {...register('country', {
                    required: {
                      value: true,
                      message: 'this field is required',
                    },
                  })}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </SelectElem>
                {errors.country && <ErrorsText>{errors.country.message}</ErrorsText>}
                <label>Post index:</label>
                <InputElem
                  {...register('postalCode', {
                    required: {
                      value: true,
                      message: 'this field is required',
                    },
                    pattern: {
                      value: new RegExp(
                        COUNTRIES.find((c) => c.code === getValues('country'))?.zipRegexp || '',
                        'gm',
                      ),
                      message: 'post index does not correspond to the selected country',
                    },
                  })}
                />
                {errors.postalCode && <ErrorsText>{errors.postalCode.message}</ErrorsText>}
                <label>City:</label>
                <InputElem
                  {...register('city', {
                    required: {
                      value: true,
                      message: 'this field is required',
                    },
                    pattern: {
                      value: /^[^\d%\\&?,';:!-+!@#$^*)(]{1,50}$/gm,
                      message: 'wrong city name',
                    },
                  })}
                />
                {errors.city && <ErrorsText>{errors.city.message}</ErrorsText>}

                <label>Street:</label>
                <InputElem
                  type={'text'}
                  {...register('streetName', {
                    required: {
                      value: true,
                      message: 'this field is required',
                    },
                  })}
                />
                {errors.streetName && <ErrorsText>{errors.streetName.message}</ErrorsText>}

                {mode === 'Shipping' && (
                  <DefaultCheckboxLabel>
                    <input
                      type={'checkbox'}
                      onChange={(e) => setAddBillingAddress(e.target.checked)}
                    />
                    Add billing address
                  </DefaultCheckboxLabel>
                )}
              </fieldset>
            </Container>
            <ButtonSubmit type={'submit'} disabled={isDirty && !isValid}>
              Sign Up
            </ButtonSubmit>
          </Form>
        </Container>
        <Footer />
      </PageWrapper>
    </>
  );
}
