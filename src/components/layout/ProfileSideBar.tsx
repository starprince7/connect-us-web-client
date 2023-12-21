import React from 'react'
import { useSelector } from 'react-redux'
import AvatarChatMan from '../../assets/icons/chat-man-avatar.svg'
import AvatarChatWoman from '../../assets/icons/chat-woman-avatar.svg'
import { HiXCircle as CloseIcon } from 'react-icons/hi'
import { selectChat } from '../../store/chat/reducer'

type Props = {
  isActive: boolean
  closeProfileBar: () => void
}

export const ProfileSideBar = ({ isActive, closeProfileBar }: Props) => {
  const {
    chatRecipientInformation: { email, fullname, onLeave, gender },
  } = useSelector(selectChat)
  return (
    <div
      className={`min-h-full sm:min-h-[85%] ${
        isActive ? 'w-full sm:w-1/3 opacity-100' : 'w-0 opacity-0'
      } rounded-2xl bg-gray-100 grid place-content-center absolute top-0 left-0 z-30 sm:relative transition-all ease-in-out duration-100`}
    >
      <button className='absolute top-5 right-4' onClick={closeProfileBar}>
        <CloseIcon style={{ width: 30, height: 30 }} />
      </button>
      <div className='text-center'>
        <img
          src={gender === 'M' ? AvatarChatMan : AvatarChatWoman}
          alt='Avatar logo'
          className='h-28 mx-auto mb-3'
        />
        <div className='text-gray-500 text-sm'>{onLeave ? 'On Leave' : 'Active'}</div>
        <h3 className='text-xl font-bold my-1'>{fullname}</h3>
        <div className='text-gray-500 text-sm'>{email}</div>
      </div>
    </div>
  )
}
