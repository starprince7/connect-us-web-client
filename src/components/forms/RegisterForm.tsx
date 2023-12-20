import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Input from '../ui/Input'
import PasswordInput from '../ui/PasswordInput'
import DropdownInput from '../ui/DropdownInput'
import { registerUser, selectAuth } from '../../store/auth/reducer'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector(selectAuth)

  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('')
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    if (isLoggedIn) navigate('/teams')
  }, [isLoggedIn])

  const options = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
  ]
  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // check the format of the email using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.')
      return
    }

    if (password !== confirmPassword) {
      setError('password and confirm password does not match')
      return
    }
    //reset all errors
    setError('')
    // Continue with form submission logic
    const registrationData = {
      fullname,
      email,
      password,
      gender,
      adminKey: key,
    }

    dispatch(registerUser(registrationData) as any)

    // Reset form fields
    setFullName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setGender('')
    setKey('')
  }
  return (
    <div>
      <div className='w-full md: max-w-[550px] flex my-20 md:mt-10 min-h-screen  flex-col m-auto px-5'>
        <h3 className='py-5 font-bold text-xl'>Sign Up</h3>
        <form className='rounded p-3 bg-gray-100' onSubmit={handleSubmit}>
          <Input
            label='Full Name'
            id='fullname'
            name='fullname'
            type='fullname'
            autoFocus={true}
            placeholder='Enter fullname'
            required={true}
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
          <div>
            <Input
              label='Email'
              id='email'
              name='email'
              type='email'
              required={true}
              value={email}
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
          </div>
          <div className='block md:flex md:space-x-1 relative'>
            <PasswordInput
              label='Password'
              id='password'
              name='password'
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              label='Confirm Password'
              id='confirmPassword'
              name='confirmPassword'
              required={true}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className='text-red-500 text-sm'>{error}</p>
          <DropdownInput
            label='Gender'
            options={options}
            value={gender}
            required
            onChange={handleDropdownChange}
          />
          <Input
            label='Admin Key(optional)'
            id='key'
            name='key'
            type='key'
            placeholder='Enter Admin key'
            autoFocus={true}
            required={false}
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <button className='bg-black w-full flex justify-center text-white font-semibold rounded p-2 my-6'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
