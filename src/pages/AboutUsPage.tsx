import React from 'react';

import styled from 'styled-components';

import { Header, Footer } from '../components';
import { ContentWrapper, PageWrapper, FooterLink } from '../components/common/CommonStyles';

import { TeamMemberCard } from '../components/common';

// import Logo from '../Icons/sources/school_logo.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
  margin: auto;
`;

const AboutUsPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Irina Strigo',
      jobTitle: 'Junior Software Developer',
      link: 'https://github.com/irene-strigo',
      bio: 'I have been studying programming for about a year and a half, mastered the basics of layout, JavaScript, and React, worked on several educational projects, interned at the it-girls school',
    },
    {
      id: 2,
      name: 'Hanna Dziakava',
      jobTitle: 'Junior Software Developer',
      link: 'https://github.com/HDziakava',
      bio: 'In my 1.5 year learning journey I’ve finished 3 JavaScript courses on RSSchool, several Udemy JS and React courses, and recently applied my knowledge on production-grade financial app as a Junior Software Engineer. I’ve also built several petprojects to gain more hands-on experience with my current stack and modern build practices.',
    },
  ];

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper $alignItems={'flex-start'}>
        <Wrapper>
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              jobTitle={member.jobTitle}
              link={member.link}
              bio={member.bio}
            />
          ))}
        </Wrapper>
        <FooterLink href={'https://rs.school/'}>
          {/* <Logo /> */}
          School logo
        </FooterLink>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default AboutUsPage;
