// import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// interface InputProps {
//   id: string;
//   name: string;
//   label: string;
//   required: boolean;
//   type: string;
//   value: string;
//   autoFocus?: boolean;
//   onChange: React.ChangeEventHandler<HTMLInputElement>;
// }

// const PasswordInput = ({
//   id,
//   name,
//   required,
//   type,
//   value,
//   label,
//   onChange,
// }: InputProps) => {
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="relative">
//       <label htmlFor={id} className="block my-3">
//         {label}
//       </label>
//       <input
//         id={id}
//         name={name}
//         type={showPassword ? 'text' : 'password'}
//         required={required}
//         value={value}
//         onChange={onChange}
//         className="w-full p-2 rounded outline-none"
//       />
//       <span
//         className="absolute bottom-3 right-1 cursor-pointer"
//         onClick={togglePassword}
//       >
//         {showPassword ? <FaEyeSlash /> : <FaEye />}
//       </span>
//     </div>
//   );
// };

// export default PasswordInput;

import React, { useState, ChangeEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordInputProps {
  label: string;
  id: string;
  name: string;
  required: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, id, name, required, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;

    // Check password length
    if (newPassword.length < 5) {
      setPasswordError('Password must be at least five characters long.');
    } else {
      setPasswordError('');
    }

    onChange(e);
  };

  return (
    <div className='relative'>
      <label htmlFor={id} className='block my-3'>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        required={required}
        value={value}
        onChange={handlePasswordChange}
        className='w-full p-2 rounded outline-none'
      />
      <span className='absolute top-12 md:top-[3.7rem] right-1' onClick={togglePassword}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
    </div>
  );
};

export default PasswordInput;