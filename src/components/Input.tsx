import React, { ChangeEvent } from 'react';

type Props = {
  type: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'date';
  placeholder?: string;
  name: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, placeholder, name, disabled = false, onChange }: Props) => {
  return (
    <input
      value={''}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    ></input>
  );
};

export default Input;
