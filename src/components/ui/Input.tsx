import React from 'react'

interface InputProps {
    id: string;
    name: string;
    label: string;
    required: boolean;
    type: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;

}
const Input = ({ id, name, required , type,  value, label, onChange}: InputProps) => {
    return (
        <div>
            <label htmlFor= {id} className='block my-3'>{label}</label>
            <input
              id={id} 
              name={name}
              type={type}
              required={required}
              value={value}
              onChange={onChange}
              className='w-full p-2 rounded outline-none'
            />
        </div>
    )
}

export default Input