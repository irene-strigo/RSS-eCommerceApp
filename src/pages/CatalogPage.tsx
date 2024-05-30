import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Product } from '@commercetools/platform-sdk';

import { getProducts } from '../services/Client';

import { Header, Footer, ProductCard } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
import { Grid } from '../components/common';

const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then((data) => {
      if (data) setProducts(data.results);
    });
  }, []);

  const handleClick = (id: string) => {
    navigate(`/catalog/item/${id}`);
  };

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <Grid>
          {products?.map((product) => (
            <ProductCard
              isCatDisplay={true}
              onClick={() => handleClick(product.id)}
              key={product.id}
              productData={product}
            />
          ))}
        </Grid>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default CatalogPage;
