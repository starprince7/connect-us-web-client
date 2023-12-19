import React from 'react'
import { useDispatch } from 'react-redux'

export const GrantLeave = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const [textContent, setTextContent] = React.useState('');
    const [emailError, setEmailError] = React.useState('')
 
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();

         // check the format of the email using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.')
      return
    }

       const data = {
        email,
        textContent,
       }
       console.log(data)
        //reset form field
        setEmail('');
        setTextContent("")
    }
  return (
    <div className='border min-h-full w-full col-span-2 rounded-2xl relative bg-gray-100 transition-all ease-in duration-1000 p-5'>
        <p className=''>Grant leaves to employee</p>
        <form onSubmit={handleSubmit}>
        <div>
          <input
          id=""
          name="userLink"
          type="email"
          placeholder='Enter email'
          required
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          className='w-full outline-none px-2 py-2.5 my-2 rounded'
          />
          {emailError && <p className='text-red-500 text-sm my-1'>{emailError}</p>}
          </div>
          <div>
            <textarea 
                required
                value={textContent}
                onChange={(e)=>setTextContent(e.target.value)}
                placeholder='Send message'
                className='outline-none p-2 w-full'/>
          </div>
        <button type='submit' className='rounded-xl bg-black py-2 px-10 mt-3 font-semibold text-white'>Grant Leave</button>
        </form>
    </div>
  )
}
