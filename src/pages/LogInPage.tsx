import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../components';
import { useForm, SubmitHandler } from 'react-hook-form';
import ShowButton from '../components/common/SwitchButton';
import { ButtonSubmit, Container, ErrorsText, Form, InputElem, PageWrapper } from './PagesStyles';

type Inputs = {
  login: string;
  password: string;
};

export default function LoginPage() {
  const headerButtons = [
    { id: 1, link: '/sign-up-page', label: 'Sign Up' },
    { id: 2, link: '/', label: 'Main Page' },
  ];

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors, isValid, isDirty },
  } = useForm<Inputs>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    setFocus('login');
  }, []);

  console.log(watch('login')); // watch input value by passing the name of it

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
          <fieldset>
            <legend>Enter your data</legend>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <label>Log In:</label>
              <InputElem
                {...register('login', {
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
              {errors.login && <ErrorsText>{errors.login.message}</ErrorsText>}
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
              {errors.password && 'red' && <ErrorsText>{errors.password.message}</ErrorsText>}
              <ButtonSubmit type={'submit'} disabled={isDirty && !isValid}>
                Log In
              </ButtonSubmit>
            </Form>
          </fieldset>
        </Container>
        <Footer />
      </PageWrapper>
    </>
  );
}
