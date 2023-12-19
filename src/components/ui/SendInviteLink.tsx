import React from 'react'
import { useDispatch } from 'react-redux'

export const SendInviteLink = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
 
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()

         // check the format of the email using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.')
      return
    }

       const sendInviteLink = {
        email
       }
        //reset form field
        setEmail('');
    }
  return (
    <div className='border min-h-full w-full col-span-2 rounded-2xl relative bg-gray-100 transition-all ease-in duration-1000 p-5'>
        <p className=''>Use this to generate a user sign up link</p>
        <form onSubmit={handleSubmit}>
        <div>
          <input
          id="userLink"
          name="userLink"
          type="email"
          placeholder='Enter user link'
          required
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          className=' outline-none px-2 py-2.5 my-2 rounded'
          />
          {emailError && <p className='text-red-500 text-sm my-1'>{emailError}</p>}

          </div>
        <button type='submit' className='rounded-xl bg-black py-2 px-10 mt-3 font-semibold text-white'>Generate</button>
        </form>
    </div>
  )
}
