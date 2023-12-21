import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { grantStaffLeaveOfAbsence, selectStaffs } from '../store/staffs/reducer'

export const GrantLeave = () => {
  const dispatch = useDispatch()
  const { requestStatus } = useSelector(selectStaffs)
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

    dispatch(grantStaffLeaveOfAbsence({ email }) as any)

    setEmail('')
  }
  return (
    <div className='border min-h-full w-full col-span-2 rounded-2xl relative bg-gray-100 transition-all ease-in duration-1000 p-5'>
      <p className=''>Grant leaves to employee</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id=''
            name='userLink'
            type='email'
            placeholder='Enter email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border outline-none px-2 py-2.5 my-2 rounded w-full sm:w-[60%]'
          />
          {emailError && <p className='text-red-500 text-sm my-1'>{emailError}</p>}
        </div>
        <button
          type='submit'
          disabled={requestStatus === 'loading'}
          className='rounded-xl bg-black py-2 px-10 mt-3 font-semibold text-white'
        >
          {requestStatus === 'loading' ? 'Granting Leave...' : 'Grant Leave'}
        </button>
      </form>
    </div>
  )
}
