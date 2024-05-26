import React from 'react';
import { Header, Footer } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CartPage = () => {
  const notify = () => toast('Wow so easy!');
  return (
    <PageWrapper>
      <Header />
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
      <ContentWrapper>Your cart</ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default CartPage;
