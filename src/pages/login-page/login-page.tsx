import { ReactElement } from 'react';
import './login-page.css';
import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PageWrapper from '../../components/page-wrapper/page-wrapper';
import './login-page.css';
import Form from '../../components/form/form';
import Button from '../../components/button/button';
import Input from '../../components/input/input';

const LoginPage = (): ReactElement => {
  return (
    <div className="login-page">
      <Header></Header>
      <PageWrapper
        items={
          <Form
            name={'login-form'}
            value={[]}
            onSubmit={function (): void {
              throw new Error('Function not implemented.');
            }}
            content={
              <>
                <Input
                  type={'text'}
                  onChange={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  placeholder={'login'}
                  value={''}
                  name={''}
                  error={false}
                ></Input>
                <Input
                  type={'text'}
                  onChange={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  placeholder={'password'}
                  value={''}
                  name={''}
                  error={false}
                ></Input>
                <Button
                  label={'submit'}
                  onClick={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                ></Button>
              </>
            }
          ></Form>
        }
      ></PageWrapper>
      <Footer></Footer>
    </div>
  );
};

export default LoginPage;
