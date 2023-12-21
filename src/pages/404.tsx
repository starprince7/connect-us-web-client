import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import NotFoundArt from '../assets/illustrations/taken_to_404.svg'

export default function NotFoundPage() {
  return (
    <div className=''>
      <Navbar />
      <div className='w-full flex sm:flex-col md:flex-row'>
        <div className='w-full md:w-1/2 hidden sm:block bg-black'>
          <NotFoundIllustration />
        </div>
        <div className='w-full md:w-1/2 overflow-y-auto'>
          {/* Add a max-height to limit the form height */}
          <div className='max-h-screen p-4'>
            <NotFoundText />
          </div>
        </div>
      </div>
    </div>
  )
}

function NotFoundText() {
  return (
    <div className='w-full md: max-w-[550px] mt-20 min-h-screen grid place-content-center m-auto px-5'>
      <div>
        <h3 className='py-5 font-bold text-3xl md:text-5xl'>404</h3>
        <h3 className='py-5 font-semibold text-lg'>Page was not found!</h3>
      </div>
    </div>
  )
}

function NotFoundIllustration() {
  return (
    <div className='bg-black text-white leading-7 px-12  flex flex-col justify-center min-h-screen'>
      <img
        src={NotFoundArt}
        alt='Illustration 404 not found'
        className='w-[80%] sm:w-[70%] mx-auto'
      />
    </div>
  )
}
