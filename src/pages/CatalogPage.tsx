import React from 'react';

import { Header, Footer } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
import ProductPage from './ProductPage';

const CatalogPage = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <ProductPage />
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default CatalogPage;
