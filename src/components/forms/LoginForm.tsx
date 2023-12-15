import React, { useState } from 'react'
import Input from '../ui/Input'
import PasswordInput from '../ui/PasswordInput'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [key, setKey] = useState('')
  return (
    <div className='w-full md: max-w-[550px] flex mt-20 min-h-screen  flex-col m-auto px-5'>
      <h3 className='py-5 font-bold text-xl'>Sign In</h3>
      <form className=' rounded p-3 bg-gray-100'>
        <Input
          label='Email'
          id='email'
          name='email'
          type='email'
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label='Password'
          id='password'
          name='password'
          type='password'
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label='Admin Key(optional)'
          id='key'
          name='key'
          type='key'
          required={false}
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button className='bg-black w-full flex justify-center text-white font-semibold rounded p-2 my-6'>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LoginForm
