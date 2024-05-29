import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const SliderContainer = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  // width: 62%;

  overflow: hidden;
`;

const PhotoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  transition: 0.3s;
  transform: translateX(0);
`;

const ArrowLeft = styled.div`
  display: inline-block;
  border: solid #000;
  border-width: 0 1px 1px 0;
  padding: 3px;
  transform: rotate(135deg);
  cursor: pointer;
  margin-top: 20px;
`;

const ArrowRight = styled.div`
  display: inline-block;
  border: solid #000;
  border-width: 0 1px 1px 0;
  padding: 3px;
  transform: rotate(-45deg);
  cursor: pointer;
  margin-top: 20px;
`;

type Props = {
  photos: { url: string }[];
};

const Slider = ({ photos }: Props) => {
  // const [currSlide, setCurrSlide] = useState(0);

  // const moveToSlide = (slideIndex: number) => {
  //   if (slideIndex < 0 || slideIndex > 4) return;

  //     const widthToSlide = img.offsetWidth + parseInt(getComputedStyle(img).marginRight);
  //     const translate = `translateX(calc(-${slideIndex * widthToSlide}px))`;
  //     picsWraper.style.transform = translate;
  //     arrowPrev.style.cursor = slideIndex === 0 ? 'default' : 'pointer';
  //     arrowNext.style.cursor = slideIndex === 4 ? 'default' : 'pointer';

  //   setCurrSlide(slideIndex);
  // };

  return (
    <Wrapper>
      <ArrowLeft />
      <SliderContainer>
        <PhotoContainer>
          {photos.map((photo) => (
            <img key={photo.url} src={photo.url} />
          ))}
        </PhotoContainer>
      </SliderContainer>
      <ArrowRight />
    </Wrapper>
  );
};

export default Slider;
