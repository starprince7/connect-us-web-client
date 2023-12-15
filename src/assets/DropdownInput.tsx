import React, { useState } from 'react';

interface DropdownProps {
 label:string;
 options :any;
 value: string;
 onChange:React.ChangeEventHandler<HTMLSelectElement> ;
}
const DropdownInput = ({ label, options, value, onChange }: DropdownProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="dropdown" className="block my-3">
        {label}
      </label>
      <select
        id="dropdown"
        name="dropdown"
        value={value}
        onChange={onChange}
        className="w-full p-2 mt-1 border rounded-md outline-none bg-white"
      >
        <option value="" disabled></option>
        {options.map((option:any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;