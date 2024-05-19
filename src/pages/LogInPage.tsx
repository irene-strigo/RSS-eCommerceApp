import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../components/common/AuthContext';

import { Header, Footer, LogInData } from '../components';
import { PageWrapper, FormComponent, SubmitButton, ContentWrapper } from '../components/common';

const LogInPage = () => {
  const navigate = useNavigate();
  const authUser = useUser();

  useEffect(() => {
    if (authUser.userId) navigate('/main');
  });

  const headerButtons = [
    { id: 1, link: '/sign-up-page', label: 'Sign Up' },
    { id: 2, link: '/main', label: 'Main Page' },
  ];

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  return (
    <>
      <PageWrapper>
        <Header buttons={headerButtons} />
        <ContentWrapper>
          <FormComponent
            onSubmit={() =>
              authUser.logIn({
                email: userData.email,
                password: userData.password,
                anonymousCart: null,
              })
            }
            navigateTo={'/main'}
          >
            <LogInData userData={userData} setUserData={setUserData} />
            <SubmitButton label={'Log In'} />
          </FormComponent>
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default LogInPage;
