import React from 'react';

import { Header, Footer } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';

const CatalogPage = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>Catalog</ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default CatalogPage;
