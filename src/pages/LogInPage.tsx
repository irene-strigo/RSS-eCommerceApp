import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../components';
import { PageWrapper } from '../components/common';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import ShowButton from '../components/common/ShowButton';

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
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  background-color: #f7f9ff;
  width: 100%;
  overflow-x: auto;
  padding: 20px;
  font-size: 20px;
`;
const ErrorsText = styled.p`
  color: red;
  font-size: 13px;
`;

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
