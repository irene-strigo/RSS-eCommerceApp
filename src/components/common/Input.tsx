import React from 'react';
import styled from 'styled-components';

type Props = {
  value?: string;
  checked?: boolean;
  type: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'date';
  placeholder?: string;
  name: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ErrorDiv = styled.div`
  color: red;
  min-height: 20px;
`;

const InputElement = styled.input`
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  color: #39739d;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;

  &:focus {
    outline: none;
    border: 2px solid #39739d;
  }
`;

const Input = ({ value, type, placeholder, name, disabled = false, onChange }: Props) => {
  return (
    <>
      <ErrorDiv></ErrorDiv>
      <InputElement
        value={value}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      ></InputElement>
    </>
  );
};

export default Input;
