import React from 'react';
import './button.css';

interface IButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({ label, onClick }) => {
  return (
    <button className="app-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
