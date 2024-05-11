import React from 'react';
import { useState } from 'react';
import { Header, Footer, PageWrapper, Form, Input, Button } from '../components';
import styled from 'styled-components';

const AddAddressDiv = styled.div``;

const handleSubmit = () => {
  console.log('Submit');
};

const RegistrationPage = () => {
  const [divVisibility, setDivVisibility] = useState('none');
  const changeDivVisibility = () => {
    return divVisibility === 'none' ? setDivVisibility('block') : setDivVisibility('none');
  };
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
          <label>
            Enter your date of birth:
            <Input name={'birthDate'} type={'date'} onChange={() => console.log('birth date')} />
          </label>
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
          <label>
            Add different billing address:
            <Input
              name={'addBilling'}
              type={'checkbox'}
              onChange={() => {
                {
                  changeDivVisibility();
                }
                console.log('add different billing address');
              }}
            />
          </label>
          <AddAddressDiv style={{ display: divVisibility }}>
            <fieldset>
              <legend>Billing Address</legend>
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
          </AddAddressDiv>

          <Button onSubmit={handleSubmit} label={'Sign Up'} />
        </Form>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default RegistrationPage;
