import React from 'react'
import { NewsContext } from '../pages/dashboard/newsPage'

export const NewsBox = () => {
  return (
    <div className='border min-h-[85%] w-full col-span-2 rounded-2xl relative bg-gray-100 px-2 transition-all ease-in duration-1000'>
      <NewsBoxHeader />
      {/* <NewsBoxInput /> */}
    </div>
  )
}

function NewsBoxHeader() {
  const { setShowUserNewsRoomInfo } = React.useContext(NewsContext)
  return (
    <div className='rounded-lg border p-2 absolute top-0 left-0 w-full px-3.5 z-20 bg-white'>
      <button
        className='space-y-1 flex flex-col items-start justify-start'
        onClick={() => setShowUserNewsRoomInfo(true)}
      >
        <h1 className='font-bold hover:underline underline-offset-2'>Broadcast Channel</h1>
        <div className='text-sm text-gray-500'>Live</div>
      </button>
    </div>
  )
}

function NewsBoxInput() {
  return (
    <div className=' absolute bottom-2 left-0 w-full px-3 z-20'>
      <div className='rounded-lg flex items-center border space-x-2 p-1.5 bg-white'>
        <input
          type='text'
          className='w-full outline-none px-2 py-2.5'
          placeholder='Write a message...'
        />
        <button type='submit' className='rounded-lg bg-black py-2 px-10 font-semibold text-white'>
          Send
        </button>
      </div>
    </div>
  )
}
