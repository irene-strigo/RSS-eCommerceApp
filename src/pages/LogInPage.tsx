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

  console.log(userData);

  return (
    <>
      <PageWrapper>
        <Header buttons={headerButtons} />
        <ContentWrapper>
          <Form>
            <LogInData userData={userData} setUserData={setUserData} />
            <SubmitButton label={'Log In'} />
          </Form>
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default LogInPage;
