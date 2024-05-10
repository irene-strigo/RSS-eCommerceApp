import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.footer`
  background-color: blanchedalmond;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #254441;

  & hover {
    color: #426965;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <FooterLink href={'https://github.com/irene-strigo'}>Irene Strigo GitHub</FooterLink>
      <FooterLink href={'https://rs.school/'}>Logo</FooterLink>
      <FooterLink href={'https://github.com/HDziakava'}>Hanna Dziakava GitHub</FooterLink>
    </Wrapper>
  );
};

export default Footer;

{
  /* <footer className="app-footer">
      <a href="https://github.com/irene-strigo" className="footer-link">
        GitHub
      </a>
      <a href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width={70} height={70} viewBox="0 0 1024 1024">
          <path fill="#FF6F59" d="M0 0v1024h1024V0H0Z" />
          <path
            fill="#254441"
            d="M520 869H153V510a365 365 0 0 1 351-360l35 2a365 365 0 0 1 330 318c2 22 2 45 2 68v330l-351 1ZM416 276c-43 3-89 18-123 45-18 14-49 43-50 67v71c0 5-1 13 1 18v1c4 8 12 8 19 8h105c-1 67-23 136-50 196l-19 40c-6 12-18 25 1 35l102 49c18 8 30 20 43-2l68-112 49 83 16 28c11 21 21 14 40 4l79-38c11-5 43-14 37-31l-11-22-14-30c-27-59-52-134-53-200h102c18 0 23-3 23-23v-77c0-14-11-27-19-36-38-44-92-70-150-73-10-1-13 4-21 10-52 38-110 33-160-2-4-3-10-9-15-9Z"
          />
          <path
            fill="#254441"
            d="m542 456-18 40c-12 23-11 24-23 1l-22-53-29-80-8-30 10 4c43 17 90 16 133-3-8 39-27 85-43 121Zm-26 122c-21 3-25-24-7-31 20-1 26 25 7 31Zm-3 71c-21-2-20-28-1-31 19 1 21 28 1 31Z"
          />
        </svg>
      </a>
      <a href="https://github.com/HDziakava" className="footer-link">
        GitHub
      </a>
    </footer> */
}
