import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Input from '../ui/Input'
import PasswordInput from '../ui/PasswordInput'
import { logInUser, selectAuth } from '../../store/auth/reducer'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(selectAuth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isLoggedIn) navigate('/teams')
  }, [isLoggedIn])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const loginData = {
      email,
      password,
    }

    dispatch(logInUser(loginData) as any)

    //reset form field
    setEmail('')
    setPassword('')
  }
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
          placeholder='Enter email'
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
        <button
          type='submit'
          className='bg-black w-full flex justify-center text-white font-semibold rounded p-2 my-6'
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LoginForm
