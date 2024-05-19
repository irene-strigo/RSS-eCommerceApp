import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/common/AuthContext';
import { Header, Footer, LogInData } from '../components';
import { ButtonSubmit, Container, Form, PageWrapper } from '../components/common/CommonStyles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MyCustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { LogInCustomer } from '../services/Client';

const LogInPage = () => {
  const navigate = useNavigate();
  const authUser = useUser();

  useEffect(() => {
    if (!authUser.checkingAuth && authUser.hasAuth) navigate('/main');
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<MyCustomerSignin>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<MyCustomerSignin> = async (data) => {
    try {
      const customer = await LogInCustomer(data);
      if (customer && customer.id) {
        await authUser.refresh();
        navigate('/');
      }
    } catch (err) {
      alert('Что-то пошло не так, попробуйте еще раз чуть позже');
    }
  };

  if (authUser.checkingAuth) {
    return <>Loading...</>;
  }

  return (
    <>
      <PageWrapper>
        <Header />
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Container>
              <LogInData register={register} errors={errors} />
            </Container>
            <ButtonSubmit type={'submit'} disabled={isDirty && !isValid}>
              Log in
            </ButtonSubmit>
          </Form>
        </Container>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default LogInPage;
