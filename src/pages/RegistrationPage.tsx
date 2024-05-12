import React, { useState } from 'react';

import { Header, Footer, BillingAddress, DeliveryAddress, PersonalData } from '../components';
import { PageWrapper, Form, Input, SubmitButton, ContentWrapper } from '../components/common';

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
  const headerButtons = [
    { id: 1, link: '/log-in-page', label: 'Log In' },
    { id: 2, link: '/', label: 'Main Page' },
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

  console.log(userData);

  const handleChange = () => {
    setBillingData(billingData ? null : addressInitialData);
  };
  return (
    <>
      <PageWrapper>
        <Header buttons={headerButtons} />
        <ContentWrapper>
          <Form>
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
          </Form>
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default RegistrationPage;
