import React from 'react'
import AvatarChatMan from '../assets/icons/chat-man-avatar.svg'
import AvatarChatWoman from '../assets/icons/chat-woman-avatar.svg'

export const StaffsLeave = () => {
    const gender ="M"
  return (
    <div className='border min-h-full w-full col-span-2 rounded-2xl relative bg-gray-100 transition-all ease-in duration-1000 p-5'>
         <div>
         <img src={gender === 'M' ? AvatarChatMan : AvatarChatWoman} alt='avatar image' />
        </div> 
    </div>
  )
}
