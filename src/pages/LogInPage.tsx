import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/common/AuthContext';
import { Header, Footer, LogInData } from '../components';
import {
  ButtonSubmit,
  Container,
  ContentWrapper,
  Form,
  PageWrapper,
} from '../components/common/CommonStyles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MyCustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { LogInCustomer } from '../services/Client';
import CommentsDiv from '../components/common/CommentsDiv';

const LogInPage = () => {
  const navigate = useNavigate();
  const authUser = useUser();
  const [logError, setLogError] = useState('');
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
      setLogError('wrong login or password');
    }
  };

  if (authUser.checkingAuth) {
    return <>Loading...</>;
  }
  return (
    <>
      <PageWrapper>
        <Header />
        <ContentWrapper>
          <Container>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              onChange={() => {
                setLogError('');
              }}
            >
              <Container>
                <LogInData register={register} errors={errors} />
                <CommentsDiv error={logError}></CommentsDiv>
              </Container>
              <ButtonSubmit type={'submit'} disabled={isDirty && !isValid}>
                Log in
              </ButtonSubmit>
            </Form>
          </Container>
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default LogInPage;
