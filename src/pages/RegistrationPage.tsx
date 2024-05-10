import React from 'react';

import { Header, Footer, PageWrapper, Form, Input, Button } from '../components';

const handleSubmit = () => {
  console.log('Submit');
};

const RegistrationPage = () => {
  return (
    <>
      <PageWrapper>
        <Header />
        <Form>
          <Input
            name={'email'}
            placeholder={'Enter your email'}
            type={'email'}
            onChange={() => console.log('email')}
          />
          <Input
            name={'password'}
            placeholder={'Enter your password'}
            type={'password'}
            onChange={() => console.log('password')}
          />
          <Input
            name={'firstName'}
            placeholder={'Enter your first name'}
            type={'text'}
            onChange={() => console.log('first name')}
          />
          <Input
            name={'lastName'}
            placeholder={'Enter your last name'}
            type={'text'}
            onChange={() => console.log('last name')}
          />
          <Input
            name={'birthDate'}
            placeholder={'Enter your date of birth'}
            type={'date'}
            onChange={() => console.log('birth date')}
          />
          <fieldset>
            <legend>Delivery Address</legend>
            <p>
              Country:{' '}
              <Input
                name={'country'}
                placeholder={'Enter your country'}
                type={'text'}
                onChange={() => console.log('country')}
              />
            </p>
            <p>
              Post index:{' '}
              <Input
                name={'index'}
                placeholder={'Enter your post index'}
                type={'text'}
                onChange={() => console.log('index')}
              />
            </p>
            <p>
              City:{' '}
              <Input
                name={'city'}
                placeholder={'Enter your city'}
                type={'text'}
                onChange={() => console.log('city')}
              />
            </p>
            <p>
              Street:{' '}
              <Input
                name={'street'}
                placeholder={'Enter your street'}
                type={'text'}
                onChange={() => console.log('street')}
              />
            </p>
          </fieldset>
          <Button onSubmit={handleSubmit} label={'Log In'} />
        </Form>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default RegistrationPage;
