import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ConnectUs from '../components/connectUs/ConnectUs'
import RegisterForm from '../components/forms/RegisterForm'

const SignUp = () => {
    return (
        <div className=''>
            <Navbar />
        <div className="w-full flex sm:flex-col md:flex-row justify-between">
            <div className='w-full md:w-1/2 hidden sm:block bg-black'><ConnectUs /></div>
            <div className='w-full md:w-1/2'><RegisterForm /></div>
        </div>
        </div>
    )
}

export default SignUp
