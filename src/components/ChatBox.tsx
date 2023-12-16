import React from 'react'
import { ChatContext } from '../pages/dashboard/teamsPage'
import { HiXCircle as CloseIcon } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { closeChat, selectChat } from '../store/chat/reducer'
import collaborateIllustration from '../assets/illustrations/collaborate-illustration.svg'

export const ChatBox = () => {
  const { isChatBoxOpen } = useSelector(selectChat)
  if (!isChatBoxOpen) {
    return (
      <div className='border border-zinc-200 rounded-2xl min-h-[84%] w-full hidden sm:grid place-content-center'>
        <div className='text-center space-y-10'>
          <img src={collaborateIllustration} alt='Illustration' className='w-96' />
          <p className='text-sm sm:text-base text-gray-500'>
            Click on a team member to begin a chat
          </p>
        </div>
      </div>
    )
  }
  return (
    <div
      className={`absolute top-0 left-0 ${
        isChatBoxOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
      } h-screen z-20 sm:static transition-all ease-in-out duration-100`}
    >
      <div className='border min-h-full sm:min-h-[85%] w-full col-span-2 rounded-2xl relative bg-gray-100 px-2'>
        <ChatBoxHeader />
        <ChatBoxInput />
      </div>
    </div>
  )
}

function ChatBoxHeader() {
  const dispatch = useDispatch()
  const { setShowUserChatInfo, setShowChatBox } = React.useContext(ChatContext)
  return (
    <div className='rounded-lg border p-2 absolute top-0 left-0 w-full px-3.5 z-20 bg-white flex justify-between items-center'>
      <button
        className='space-y-1 flex flex-col items-start justify-start'
        onClick={() => setShowUserChatInfo(true)}
      >
        <h1 className='font-bold hover:underline underline-offset-2'>Guy Hawkins</h1>
        <div className='text-sm text-gray-500'>Active</div>
      </button>
      <button className='absolute top-5 right-4 sm:hidden' onClick={() => dispatch(closeChat())}>
        <CloseIcon style={{ width: 30, height: 30 }} />
      </button>
    </div>
  )
}

function ChatBoxInput() {
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
