import React from 'react';

import { Header, Footer, PageWrapper, Form, Input, Button } from '../components';

const handleSubmit = () => {
  console.log('Submit');
};

const LogInPage = () => {
  return (
    <>
      <PageWrapper />
      <Header />
      <Form>
        <Input
          name={'login'}
          placeholder={'Enter your login'}
          type={'text'}
          onChange={() => console.log('login')}
        />
        <Input
          name={'password'}
          placeholder={'Enter your password'}
          type={'password'}
          onChange={() => console.log('password')}
        />
        <Button onSubmit={handleSubmit} label={'Log In'} />
      </Form>
      <Footer />
      <PageWrapper />
    </>
  );
};

export default LogInPage;
