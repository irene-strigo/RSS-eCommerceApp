import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { GetProduct } from '../../requests';

import { Product } from '@commercetools/platform-sdk';

import { Header, Footer } from '../components';
import { ProductCard } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const token = JSON.parse(
    localStorage.getItem('PersonalToken') || localStorage.getItem('anonymousToken') || 'null',
  );

  const tokenToUse = typeof token === 'string' ? token : token.token;

  useEffect(() => {
    GetProduct({ token: tokenToUse, id }).then((data) => {
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
