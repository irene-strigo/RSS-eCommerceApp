import React from 'react';
import { Header, Footer } from '../components';
import { Container, ContentWrapper, PageWrapper } from '../components/common/CommonStyles';

const MainPage = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper $alignItems={'flex-start'}>
        <Container>Main page</Container>

        <img src="/assets/images/SummerPicture.png" alt="" />
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default MainPage;
