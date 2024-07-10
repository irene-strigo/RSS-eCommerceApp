import React from 'react';

import { FooterLink, FooterWrapper } from './common/CommonStyles';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterLink href={'https://github.com/irene-strigo'}>Irene Strigo GitHub</FooterLink>
      <FooterLink href={'https://rs.school/'}>RSSchool</FooterLink>
      <FooterLink href={'https://github.com/HDziakava'}>Hanna Dziakava GitHub</FooterLink>
    </FooterWrapper>
  );
};

export default Footer;
