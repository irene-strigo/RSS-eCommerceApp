import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../components/common/AuthContext';

import { Header, Footer, BillingAddress, DeliveryAddress, PersonalData } from '../components';
import {
  PageWrapper,
  FormComponent,
  Input,
  SubmitButton,
  ContentWrapper,
} from '../components/common';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  & input {
    margin-right: 10px;
  }
`;

const addressInitialData = {
  country: '',
  postIndex: '',
  city: '',
  street: '',
};

const RegistrationPage = () => {
  const navigate = useNavigate();
  const authUser = useUser();

  useEffect(() => {
    if (authUser.userId) navigate('/main');
  });

  const headerButtons = [
    { id: 1, link: '/log-in-page', label: 'Log In' },
    { id: 2, link: '/main', label: 'Main Page' },
  ];

  const [billingData, setBillingData] = useState<null | typeof addressInitialData>(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDay: '',
    ...addressInitialData,
  });

  const handleChange = () => {
    setBillingData(billingData ? null : addressInitialData);
  };

  return (
    <>
      <PageWrapper>
        <Header buttons={headerButtons} />
        <ContentWrapper>
          <FormComponent
            onSubmit={() =>
              authUser.signUp({
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
              })
            }
            navigateTo={'/main'}
          >
            <PersonalData userData={userData} setUserData={setUserData} />
            <DeliveryAddress userData={userData} setUserData={setUserData} />
            <Wrapper>
              <label>
                <Input
                  checked={!!billingData}
                  name={'addBilling'}
                  type={'checkbox'}
                  onChange={() => handleChange()}
                />
              </label>
              Add different billing address
            </Wrapper>
            {!billingData ? (
              <></>
            ) : (
              <BillingAddress billingData={billingData} setBillingData={setBillingData} />
            )}

            <SubmitButton label={'Sign Up'} />
          </FormComponent>
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default RegistrationPage;
