import { ReactElement } from 'react';
import './header.css';
import React from 'react';
import Button from '../button/button';
//import logo from '../../../assets/logo.svg'
//import logo1 from './images/logo1.svg';
import logo from '../../../assets/logo.svg';

const Header = (): ReactElement => {
  return (
    <header className="app-header">
      <Button></Button>

      <img src={logo} alt="app-logo"></img>
      <Button></Button>
    </header>
  );
};

export default Header;
