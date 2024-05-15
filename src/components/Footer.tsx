import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 40px;
  background-color: #d8e1ff;
  height: 65px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #974160;
  font-size: 13px;

  &:hover {
    color: #69ddff;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <FooterLink href={'https://github.com/irene-strigo'}>Irene Strigo GitHub</FooterLink>
      <FooterLink href={'https://rs.school/'}>RSSchool</FooterLink>
      <FooterLink href={'https://github.com/HDziakava'}>Hanna Dziakava GitHub</FooterLink>
    </Wrapper>
  );
};

export default Footer;
