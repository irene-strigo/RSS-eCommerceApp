import { Header, Footer } from '../components';
import { useForm, SubmitHandler } from 'react-hook-form';
import ShowButton from '../components/common/SwitchButton';
import { useState } from 'react';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { signInCustomer } from '../services/Client';
import { useNavigate } from 'react-router-dom';
import { ButtonSubmit, Container, ErrorsText, Form, InputElem, PageWrapper } from './PagesStyles';

export default function RegistrationPage() {
  const headerButtons = [
    { id: 1, link: '/log-in-page', label: 'Log In' },
    { id: 2, link: '/', label: 'Main Page' },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CustomerDraft>({ mode: 'onChange' });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CustomerDraft> = async (data) => {
    console.log('draft', data);
    const result = await signInCustomer(data);
    if (result && result.customer && result.customer.id) {
      console.log('customer', result.customer);
      localStorage.setItem('signUpCustomerId', result.customer.id);
      localStorage.setItem('signUpCustomerVersion', String(result.customer.version));
      navigate(`/sign-up-shipping-address`);
    }
  };

  const [inputType, setInputType] = useState('password');
  const [btnLabel, setBtnLabel] = useState('show password');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const togglePassInput = () => {
    if (inputType === 'password') {
      setInputType('text');
      setBtnLabel('hide password');
    } else {
      setInputType('password');
      setBtnLabel('show password');
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
                <legend>Enter your data</legend>
                <label>First name:</label>
                <InputElem
                  {...register('firstName', {
                    required: {
                      value: true,
                      message: 'this field is required',
                    },
                    pattern: {
                      value: /^[^\d%\\&?,';:!-+!@#$^*)(]{1,50}$/gm,
                      message: 'name should not contain numbers or special characters',
                    },
                  })}
                />
                {errors.firstName && <ErrorsText>{errors.firstName.message}</ErrorsText>}
                <label>Last name:</label>
                <InputElem
                  {...register('lastName', {
                    required: {
                      value: true,
                      message: 'this field is required',
                    },
                    pattern: {
                      value: /^[^\d%\\&?,';:!-+!@#$^*)(]{1,50}$/gm,
                      message: 'last name should not contain numbers or special characters',
                    },
                  })}
                />
                {errors.lastName && <ErrorsText>{errors.lastName.message}</ErrorsText>}
                <label>Email:</label>
                <InputElem
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'this field is required',
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                      message: 'enter your valid email address',
                    },
                  })}
                />
                {errors.email && <ErrorsText>{errors.email.message}</ErrorsText>}
                <label>Password:</label>
                <ShowButton
                  label={btnLabel}
                  disabled={btnDisabled}
                  type={'button'}
                  onClick={() => togglePassInput()}
                />
                <InputElem
                  type={inputType}
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'this field is required',
                    },
                    minLength: {
                      value: 8,
                      message: 'password must be at least 8 characters long',
                    },
                    onChange() {
                      setBtnDisabled(false);
                    },
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/,
                      message:
                        'password must contain lowercase and uppercase letter, number and special character',
                    },
                  })}
                />
                {errors.password && <ErrorsText>{errors.password.message}</ErrorsText>}
                <label>Birth date:</label>
                <InputElem
                  {...register('dateOfBirth', {
                    required: false,
                    valueAsDate: false,
                    validate: {
                      checkDate: (v) => Date.now() - Date.parse(String(v)) >= 0 || 'incorrect date',
                      checkAge: (v) =>
                        Date.now() - Date.parse(String(v)) > 410248800000 ||
                        'age must be at least 13 years old',
                    },
                  })}
                  type="date"
                />
                {errors.dateOfBirth && <ErrorsText>{errors.dateOfBirth.message}</ErrorsText>}
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
