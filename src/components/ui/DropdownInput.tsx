import React from 'react';

interface DropdownProps {
  label: string;
  options: any;
  value: string;
  required: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}
const DropdownInput = ({ label, required, options, value, onChange }: DropdownProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="dropdown" className="block my-3">
        {label}
      </label>
      <select
        id="dropdown"
        name="dropdown"
        value={value}
        required={required}
        onChange={onChange}
        className="w-full p-2 mt-1 border border-gray-300 rounded-lg outline-none bg-white"
      >
        <option value="" disabled className='text-sm text-gray-100'>Select an option</option>
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;