import React, { useState } from 'react'
import Input from '../ui/Input'
import PasswordInput from '../ui/PasswordInput'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState("");
  
  const handleSubmit = (e:React.FormEvent) =>{
     e.preventDefault();
    // Basic form validation
    if (password !== 'password' || email !== 'email') {
      setError('Invalid email or password.');
      return;
    }

     //To check for data id
     //const id = data.length ? data[DataTransfer.length - 1].id + 1 : 1;
     const loginData = {
      email:email,
      password :password,
      key :key
     };
     console.log(loginData);
     //reset form field
     setEmail('');
     setPassword('');
     setKey('')
  };  
  return (
    <div className='w-full md: max-w-[550px] flex mt-20 min-h-screen  flex-col m-auto px-5'>
      <h3 className='py-5 font-bold text-xl'>Sign In</h3>
      <form className=' rounded p-3 bg-gray-100' onSubmit={handleSubmit}>
        <p className='text-red-500 text-sm'>{error}</p>
        <Input
          label='Email'
          id='email'
          name='email'
          type='email'
          required={true}
          value={email}
          autoFocus={true}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label='Password'
          id='password'
          name='password'
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label='Admin Key(optional)'
          id='key'
          name='key' 
          type='key'
          placeholder='Enter Admin key'
          required={false}
          autoFocus ={true}
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button type='submit'
           className='bg-black w-full flex justify-center text-white font-semibold rounded p-2 my-6'>
           Sign In
        </button>
      </form>
    </div>
  )
}

export default LoginForm
