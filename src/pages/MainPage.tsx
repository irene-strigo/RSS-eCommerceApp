import React from 'react';
import { Header, Footer } from '../components';
import { Container, ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainPage = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper $alignItems={'flex-start'}>
        <Container>Main page</Container>
        <ToastContainer />
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default MainPage;
