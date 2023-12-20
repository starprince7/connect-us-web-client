import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateSignUpLink, selectAuth } from '../store/auth/reducer'

export const SendInviteLink = () => {
  const dispatch = useDispatch()
  const { requestStatus } = useSelector(selectAuth)
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // check the format of the email using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.')
      return
    }

    console.log(email)
    dispatch(generateSignUpLink({ email }) as any)
    //reset form field
    setEmail('')
  }
  return (
    <div className='border min-h-full w-full col-span-2 rounded-2xl relative bg-gray-100 transition-all ease-in duration-1000 p-5'>
      <p className=''>Enter a new staff email address to Generate a secure sign up link.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id='userLink'
            name='userLink'
            type='email'
            placeholder='Enter user link'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=' outline-none px-2 py-2.5 my-2 rounded border w-full sm:w-[60%]'
          />
          {emailError && <p className='text-red-500 text-sm my-1'>{emailError}</p>}
        </div>
        <button
          type='submit'
          disabled={requestStatus === 'loading'}
          className='rounded-xl bg-black py-2 px-10 mt-3 font-semibold text-white'
        >
          {requestStatus === 'loading' ? 'Generating...' : 'Generate'}
        </button>
      </form>
    </div>
  )
}
