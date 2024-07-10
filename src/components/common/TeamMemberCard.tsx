import React from 'react';

import styled from 'styled-components';

import Label from './Label';
import { FooterLink } from './CommonStyles';

const Wrapper = styled.div`
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

type Props = {
  name: string;
  jobTitle: string;
  link: string;
  bio: string;
};

const TeamMemberCard = ({ name, jobTitle, link, bio }: Props) => {
  return (
    <Wrapper>
      <Label fontWeight={900} fontSize={'30px'} color={'#000'} textDecor={'none'}>
        {name}
      </Label>
      <Label fontWeight={400} fontSize={'25px'} color={'#000'} textDecor={'none'}>
        {jobTitle}
      </Label>
      <Label fontWeight={400} fontSize={'20px'} color={'#000'} textDecor={'none'}>
        {bio}
      </Label>
      <FooterLink href={link}>GitHub</FooterLink>
    </Wrapper>
  );
};

export default TeamMemberCard;
