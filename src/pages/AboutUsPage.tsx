import React from 'react';

import styled from 'styled-components';

import { Header, Footer } from '../components';
import {
  ContentWrapper,
  PageWrapper,
  PortraitImg,
  Container,
  CartPictureContainer,
  LogoLink,
} from '../components/common/CommonStyles';

import { TeamMemberCard } from '../components/common';

// import Logo from '../Icons/sources/school_logo.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
  margin: auto;
`;
const LayoutDiv = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 400px) {
    font-size: clamp(1rem, 4vw, 5rem);
    flex-direction: column;
  }
`;
const AboutUsPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Irina Strigo',
      foto: '/assets/images/IrinaFoto.webp',
      jobTitle: 'Junior Software Developer',
      link: 'https://github.com/irene-strigo',
      bio: 'I have been studying programming for about a two years, mastered the basics of layout, JavaScript, and React, worked on several educational projects, interned at the It-girls school. On the project, I worked on methods of interaction with the backend through the SDK and some of the pages and components. My first specialty is musicology and academic singing. I plan to continue learning programming and create a slash-career.',
    },
    {
      id: 2,
      name: 'Hanna Dziakava',
      foto: '/assets/images/HannaFoto.webp',
      jobTitle: 'Junior Software Developer',
      link: 'https://github.com/HDziakava',
      bio: 'In my 1.5 year learning journey I’ve finished 3 JavaScript courses on RSSchool, several Udemy JS and React courses, and recently applied my knowledge on production-grade financial app as a Junior Software Engineer. I’ve also built several petprojects to gain more hands-on experience with my current stack and modern build practices. In the current project, I was mainly responsible for the front-end part, project structure and navigation.',
    },
  ];

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper $alignItems={'flex-start'}>
        <Wrapper>
          <LogoLink href={'https://rs.school/'}>
            <CartPictureContainer src="/assets/Icons/sources/school_logo.svg" alt="school-logo" />
          </LogoLink>
          <LayoutDiv>
            {teamMembers.map((member) => (
              <Container>
                <PortraitImg src={member.foto} alt="foto"></PortraitImg>
                <TeamMemberCard
                  key={member.id}
                  name={member.name}
                  jobTitle={member.jobTitle}
                  link={member.link}
                  bio={member.bio}
                />
              </Container>
            ))}
          </LayoutDiv>
        </Wrapper>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default AboutUsPage;
