import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

type Props = {
  type: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'date';
  placeholder?: string;
  name: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ErrorDiv = styled.div`
  color: red;
`;
const Input = ({ type, placeholder, name, disabled = false, onChange }: Props) => {
  return (
    <>
      <ErrorDiv></ErrorDiv>
      <input
        value={''}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      ></input>
    </>
  );
};

export default Input;
