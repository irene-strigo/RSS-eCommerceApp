import { ReactNode } from 'react';
import './form.css';
import React from 'react';
import Button from '../button/button';
import Input from '../input/input';

const Form = (): ReactNode => {
  return (
    <form className="app-form">
      <Input></Input>
      <Button></Button>
    </form>
  );
};

export default Form;
