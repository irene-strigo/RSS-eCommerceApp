import React from 'react';
import { Header, Footer } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
const CartPage = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>Your cart</ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default CartPage;
