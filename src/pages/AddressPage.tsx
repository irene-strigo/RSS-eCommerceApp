import { Header, Footer } from '../components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { _BaseAddress } from '@commercetools/platform-sdk';
import { setCustomerAddress } from '../services/Client';

import { useNavigate } from 'react-router-dom';
import {
  ButtonSubmit,
  Container,
  ContentWrapper,
  Form,
  PageWrapper,
} from '../components/common/CommonStyles';
import { useUser } from '../components/common/AuthContext';
import { AddressData } from '../components/AddressData';

export type AddressPageProps = {
  mode: 'Billing' | 'Shipping';
};

export default function AddressPage({ mode }: AddressPageProps) {
  const authUser = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm<_BaseAddress>({ mode: 'onChange' });

  const [useAsDefaultAddress, setUseAsDefaultAddress] = useState(false);
  const [addBillingAddress, setAddBillingAddress] = useState(false);

  const onSubmit: SubmitHandler<_BaseAddress> = async (data) => {
    if (!authUser.customer) {
      return;
    }
    await setCustomerAddress(authUser.customer.id, mode, data, useAsDefaultAddress);

    if (mode === 'Shipping' && addBillingAddress) {
      reset();
      return navigate(`/sign-up-billing-address`);
    }

    await setCustomerAddress(authUser.customer.id, 'Billing', data, true);
    reset();
    await authUser.refresh();
    navigate(`/`);
  };

  return (
    <>
      <PageWrapper>
        <Header />
        <ContentWrapper>
          <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Container>
                <AddressData
                  mode={mode}
                  register={register}
                  trigger={trigger}
                  errors={errors}
                  getValues={getValues}
                  watch={watch}
                  setUseAsDefaultAddress={setUseAsDefaultAddress}
                  setAddBillingAddress={setAddBillingAddress}
                />
              </Container>
              <ButtonSubmit type={'submit'} disabled={isDirty && !isValid}>
                Sign Up
              </ButtonSubmit>
            </Form>
          </Container>
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
}
