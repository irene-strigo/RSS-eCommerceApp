import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';

import { getProductById } from '../services/Client';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { Header, Footer } from '../components';
import { ProductCard } from '../components';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
import { ModalSlider } from '../components/common';

const ProductPage = () => {
  const [product, setProduct] = useState<ProductProjection | null>(null);
  const [isModal, setIsModal] = useState(false);
  const { id } = useParams<string>();

  useEffect(() => {
    getProductById(id || '').then((data) => {
      if (data) setProduct(data);
    });
  }, []);

  const onCloseModal = () => {
    setIsModal(false);
  };

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper $alignItems={'center'}>
        {product && (
          <ProductCard isCatDisplay={false} productData={product} setIsModal={setIsModal} />
        )}
      </ContentWrapper>
      {product && (
        <Modal open={isModal} onClose={onCloseModal} center>
          <ModalSlider productData={product} />
        </Modal>
      )}
      <Footer />
    </PageWrapper>
  );
};

export default ProductPage;
