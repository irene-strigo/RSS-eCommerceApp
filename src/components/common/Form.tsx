import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 500px;
  align-items: center;
  justify-content: center;
`;

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

const ErrorMessage = styled.div`
  color: red;
  min-height: 30px;
`;

type Props = {
  children: React.ReactElement | React.ReactElement[];
  navigateTo?: string;
  onSubmit: () => Promise<unknown>;
};

const FormComponent = ({ children, navigateTo, onSubmit }: Props) => {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit();
      if (navigateTo) navigate(navigateTo);
    } catch (error) {
      setErrorMsg((error as Error).message);
    }
  };

  return (
    <Wrapper>
      <ErrorMessage>{errorMsg}</ErrorMessage>
      <Form onSubmit={handleSubmit}>{children}</Form>
    </Wrapper>
  );
};

export default FormComponent;
