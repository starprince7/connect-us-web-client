import React from 'react'
import AvatarChatMan from '../assets/icons/chat-man-avatar.svg'
import AvatarChatWoman from '../../assets/icons/chat-woman-avatar.svg'
import { HiXCircle as CloseIcon } from 'react-icons/hi'

type Props = {
  isActive: boolean
  closeProfileBar: () => void
}

export const ProfileSideBar = ({ isActive, closeProfileBar }: Props) => {
  //   if (!isActive) return null
  return (
    <div
      className={`min-h-[85%] ${
        isActive ? 'w-1/3 opacity-100' : 'w-0 opacity-0'
      } rounded-2xl bg-gray-100 grid place-content-center relative transition-all ease-in-out duration-200`}
    >
      <button className='border absolute top-5 right-4' onClick={closeProfileBar}>
        <CloseIcon style={{ width: 30, height: 30 }} />
      </button>
      <div className='text-center'>
        <img src={AvatarChatMan} alt='Avatar logo' className='h-28 mx-auto mb-3' />
        <h3 className='text-xl font-bold my-1'>Guy Hawkins</h3>
        <div className='text-gray-500 text-sm'>guyhawkins@email.com</div>
      </div>
    </div>
  )
}
