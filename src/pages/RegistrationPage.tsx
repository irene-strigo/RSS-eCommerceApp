import { Header, Footer } from '../components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { signInCustomer } from '../services/Client';
import { useNavigate } from 'react-router-dom';
import { ButtonSubmit, Container, Form, PageWrapper } from '../components/common/CommonStyles';
import { useUser } from '../components/common/AuthContext';
import { RegistrationData } from '../components/RegistrationData';
import CommentsDiv from '../components/common/CommentsDiv';
import { useState } from 'react';

export default function RegistrationPage() {
  const authUser = useUser();
  const navigate = useNavigate();
  const [regError, setRegError] = useState('');
  if (!authUser.checkingAuth && authUser.hasAuth) {
    navigate('/main');
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<MyCustomerDraft>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<MyCustomerDraft> = async (data) => {
    try {
      const customer = await signInCustomer(data);
      console.log(customer);
      if (customer && customer.id) {
        alert('Account succesfully created');
        await authUser.refresh();
        navigate('/sign-up-shipping-address');
      }
    } catch (err) {
      setRegError('An account with such email already exists, please use another one or log in');
    }
  };

  return (
    <>
      <PageWrapper>
        <Header />
        <Container>
          {authUser.checkingAuth && <div>Loading...</div>}
          {!authUser.checkingAuth && (
            <Form
              onSubmit={handleSubmit(onSubmit)}
              onChange={() => {
                setRegError('');
              }}
            >
              <Container>
                <RegistrationData register={register} errors={errors} />
              </Container>
              <CommentsDiv error={regError}></CommentsDiv>
              <ButtonSubmit type={'submit'} disabled={isDirty && !isValid}>
                Sign Up
              </ButtonSubmit>
            </Form>
          )}
        </Container>
        <Footer />
      </PageWrapper>
    </>
  );
}
