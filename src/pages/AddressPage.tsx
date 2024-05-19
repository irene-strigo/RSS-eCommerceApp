import { Header, Footer } from '../components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { _BaseAddress } from '@commercetools/platform-sdk';
import { setCustomerAddress } from '../services/Client';
import { COUNTRIES } from '../components/Countries';
import { useNavigate } from 'react-router-dom';
import {
  ButtonSubmit,
  Container,
  DefaultCheckboxLabel,
  ErrorsText,
  Form,
  InputElem,
  PageWrapper,
  SelectElem,
} from './PagesStyles';

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

  const onSubmit: SubmitHandler<_BaseAddress> = async (data) => {
    const customerId = localStorage.getItem('signUpCustomerId');
    const version = Number(localStorage.getItem('signUpCustomerVersion')) || 0;
    if (!customerId) {
      return;
    }
    const customer = await setCustomerAddress(customerId, version, mode, data, useAsDefaultAddress);
    if (customer && customer.id) {
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
