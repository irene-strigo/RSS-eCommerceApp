import React from 'react';
import { Header, Footer } from '../components';
import {
  Banner,
  BannerContainer,
  BannerDiv,
  BannerHeading,
  ContentWrapper,
  PageWrapper,
  PromocodeName,
} from '../components/common/CommonStyles';

const MainPage = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper $alignItems={'flex-start'}>
        <BannerContainer>
          <BannerHeading>Discount 10% by promocode </BannerHeading>
          <BannerDiv>
            <Banner src="/assets/images/SummerPicture.png" alt="banner-picture" />
            <PromocodeName>SUMMER</PromocodeName>
          </BannerDiv>
        </BannerContainer>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default MainPage;
