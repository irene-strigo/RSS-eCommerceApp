import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';

import { Header, Footer } from '../components';
import { ProductCard } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
import { getProductById } from '../services/Client';

const ProductPage = () => {
  const [product, setProduct] = useState<ProductProjection | null>(null);
  const { id } = useParams<string>();

  useEffect(() => {
    getProductById(id || '').then((data) => {
      if (data) setProduct(data);
    });
  }, []);

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        {product && <ProductCard isCatDisplay={false} productData={product} />}
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default ProductPage;
