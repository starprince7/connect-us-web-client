import React, { ChangeEvent, useState } from 'react'
import Input from '../../assets/Input';
import PasswordInput from '../../assets/PasswordInput';
import DropdownInput from '../../assets/DropdownInput';

const RegisterForm = () => {
const [fullname, setFullname] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("")
const [gender, setGender] = useState("")
const [key, setKey] = useState("")

const options = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];
const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);


  };
  return (
    <div>
    <div className='w-full md: max-w-[550px] flex my-20 md:mt-10 min-h-screen  flex-col m-auto px-5'>
  <h3 className='py-5 font-bold text-xl'>Sign Up</h3>
  <form className=' rounded p-3 bg-gray-100'>
  <Input 
         label="Full Name"
         id="fullname"
         name="fullname"
         type="fullname"
         required={true}
         value={fullname}
         onChange={(e)=>setFullname(e.target.value)}
      />
      <Input 
         label="Email"
         id="email"
         name="email"
         type="email"
         required={true}
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
      />
      <div className='block md:flex gap-2 '>
      <PasswordInput 
         label="Password"
         id="password"
         name="password"
         type="password"
         required={true}
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
      />
      <PasswordInput 
         label="Confirm Password"
         id="confirmPassword"
         name="confirmPassword"
         type="confirmPassword"
         required={true}
         value={confirmPassword}
         onChange={(e)=>setConfirmPassword(e.target.value)}
      />
      </div>  
      <DropdownInput
        label="Gender"
        options={options}
        value={gender}
        onChange={handleDropdownChange}
      />  
      <Input 
         label="Admin Key(optional)"
         id="key"
         name="key"
         type="key"
         required={false}
         value={key}
         onChange={(e)=>setKey(e.target.value)}
      />
      <button className='bg-black w-full flex justify-center text-white font-semibold rounded p-2 my-6'>Sign In</button>
  </form>
  </div>
  </div>
  )
}

export default RegisterForm
