import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps {
  id: string;
  name: string;
  label: string;
  required: boolean;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput = ({
  id,
  name,
  required,
  type,
  value,
  label,
  onChange,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="block my-3">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded outline-none"
      />
      <span
        className="absolute bottom-3 right-1 cursor-pointer"
        onClick={togglePassword}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};

export default PasswordInput;