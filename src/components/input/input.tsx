import React, { ChangeEvent } from 'react';
import './input.css';

interface IInputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'checkbox';
  value: string | number;
  placeholder: string;
  name: string;
  error: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<IInputProps> = ({ type, value, placeholder, name, disabled, onChange }) => {
  return (
    <input
      className="app-input"
      value={value}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    ></input>
  );
};

export default Input;
