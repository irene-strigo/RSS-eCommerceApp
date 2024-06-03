import React from 'react';

import Slider from './Slider';
import { ProductProjection } from '@commercetools/platform-sdk';

type Props = {
  productData: ProductProjection;
};

const ModalSlider = ({ productData }: Props) => {
  const imagesArray = productData.masterVariant.images || [];

  return (
    <>
      {imagesArray.length === 1 ? (
        <img src={imagesArray[0].url} />
      ) : (
        <Slider photos={imagesArray} />
      )}
    </>
  );
};

export default ModalSlider;
