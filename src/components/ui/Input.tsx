import React from 'react'

interface InputProps {
    id: string;
    name: string;
    label: string;
    required: boolean;
    type: string;
    value: string;
    autoFocus?: boolean;
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const Input = ({ id, name, required, type, autoFocus, placeholder, value, label, onChange }: InputProps) => {
    return (
        <div>
            <label htmlFor={id} className='block my-3'>{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                required={required}
                value={value}
                autoFocus={autoFocus}
                onChange={onChange}
                placeholder={placeholder}
                className='w-full p-2 rounded-lg outline-none border border-gray-300'
            />
        </div>
    )
}

export default Input
