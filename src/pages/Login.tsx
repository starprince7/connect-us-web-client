import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar';
import ConnectUs from '../components/connectUs/ConnectUs';
import LoginForm from '../components/forms/LoginForm';


const Login = () => {
    return (
        <div className=''>
            <Navbar />
        <div className="w-full flex sm:flex-col md:flex-row">
            <div className='w-full md:w-1/2 hidden sm:block bg-black'><ConnectUs /></div>
            <div className='w-full md:w-1/2'><LoginForm /></div>
        </div>
        </div>
    )
}

export default Login
