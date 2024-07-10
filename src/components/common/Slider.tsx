import React, { useState } from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const SliderContainer = styled.div<{
  $width: string;
}>`
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
  width: ${({ $width }) => `${$width}`};
`;

const PhotoContainer = styled.div<{
  $newValue: number;
}>`
  transform: ${({ $newValue }) =>
    $newValue === 0
      ? `translateX(calc(-${$newValue * 100}% ));`
      : `translateX(calc(-${$newValue * 100}% - 10px))`};

  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  transition: 0.3s;

  & img {
    margin-right: 10px;
    width: 100%;
  }
`;

const ArrowLeft = styled.div`
  display: inline-block;
  border: solid #000;
  border-width: 0 1px 1px 0;
  padding: 5px;
  transform: rotate(135deg);
  cursor: pointer;
  position: relative;
  z-index: 10;
`;

const ArrowRight = styled.div`
  display: inline-block;
  border: solid #000;
  border-width: 0 1px 1px 0;
  padding: 5px;
  transform: rotate(-45deg);
  cursor: pointer;
`;

type Props = {
  photos: { url: string }[];
  setIsModal?: (isModal: boolean) => void;
  modalWidth?: string;
};

const Slider = ({ photos, setIsModal, modalWidth = '200px' }: Props) => {
  const [newValue, setNewValue] = useState(0);

  const handleLeftClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (newValue === 0) return;

    setNewValue(newValue - 1);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (newValue === photos.length - 1) return;

    setNewValue(newValue + 1);
  };

  const handleClick = () => {
    if (setIsModal) setIsModal(true);
  };

  return (
    <Wrapper>
      <ArrowLeft onClick={handleLeftClick} />
      <SliderContainer $width={modalWidth}>
        <PhotoContainer $newValue={newValue}>
          {photos.map((photo) => (
            <img key={photo.url} src={photo.url} onClick={handleClick} />
          ))}
        </PhotoContainer>
      </SliderContainer>
      <ArrowRight onClick={handleRightClick} />
    </Wrapper>
  );
};

export default Slider;
