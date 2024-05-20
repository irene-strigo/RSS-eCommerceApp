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
      if (customer && customer.id) {
        await authUser.refresh();
        navigate('/sign-up-shipping-address');
      }
    } catch (err) {
      setRegError('an address with this email already exists, please select another one');
      //alert('Что-то пошло не так, попробуйте еще раз чуть позже');
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
              <RegistrationData register={register} errors={errors} />
            </Container>
            <CommentsDiv error={regError}></CommentsDiv>
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
