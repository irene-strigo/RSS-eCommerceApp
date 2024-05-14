import React, { useState } from 'react';

import { Header, Footer, LogInData } from '../components';
import { PageWrapper, Form, SubmitButton, ContentWrapper } from '../components/common';

const LogInPage = () => {
  const headerButtons = [
    { id: 1, link: '/sign-up-page', label: 'Sign Up' },
    { id: 2, link: '/', label: 'Main Page' },
  ];

  const [userData, setUserData] = useState({
    login: '',
    password: '',
  });

  const [isValid, setIsValid] = useState(false);
  console.log(userData, isValid);

  return (
    <>
      <PageWrapper>
        <Header buttons={headerButtons} />
        <ContentWrapper>
          <Form>
            <LogInData
              userData={userData}
              setUserData={setUserData}
              isValid={isValid}
              setIsValid={setIsValid}
            />
            <SubmitButton label={'Log In'} disabled={isValid ? false : true} />
          </Form>
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default LogInPage;
