import React from 'react'
import AvatarChatMan from '../assets/icons/chat-man-avatar.svg'
import AvatarChatWoman from '../../assets/icons/chat-woman-avatar.svg'

export const ProfileSideBar = () => {
  return (
    <div className='min-h-[85%] w-80 rounded-2xl bg-gray-100 grid place-content-center'>
      <div className='text-center'>
        <img src={AvatarChatMan} alt='Avatar logo' className='h-28 mx-auto mb-3' />
        <h3 className='text-xl font-bold my-1'>Guy Hawkins</h3>
        <div className='text-gray-500 text-sm'>guyhawkins@email.com</div>
      </div>
    </div>
  )
}
