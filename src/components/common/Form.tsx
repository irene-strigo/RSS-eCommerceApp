import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Form, Wrapper } from './CommonStyles';

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
