import React, { useState, useEffect } from 'react';

import { ProductPagedQueryResponse, Product } from '@commercetools/platform-sdk';

import { getProducts } from '../services/Client';

import { Header, Footer } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
import { Grid } from '../components/common';
import ProductPage from './ProductPage';

const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>();

  const getAllProducts = (data: ProductPagedQueryResponse) => {
    setProducts(data.results);
  };

  useEffect(() => {
    getProducts().then((data) => {
      if (data) getAllProducts(data);
    });
  }, []);

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <Grid>
          {products?.map((product) => <ProductPage key={product.id} productData={product} />)}
        </Grid>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default CatalogPage;
