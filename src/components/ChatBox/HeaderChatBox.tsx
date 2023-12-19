import { useDispatch, useSelector } from 'react-redux'
import { ChatContext } from '../../pages/dashboard/teamsPage'
import { useContext } from 'react'
import { closeChat, selectChat } from '../../store/chat/reducer'
import { HiXCircle as CloseIcon } from 'react-icons/hi'

export default function HeaderChatBox() {
  const dispatch = useDispatch()
  const { setShowUserChatInfo, setShowChatBox } = useContext(ChatContext)
  const { chatRecipientInformation } = useSelector(selectChat)
  return (
    <div className='rounded-lg shadow-lg border p-2 absolute top-0 left-0 w-full px-3.5 z-20 bg-white flex justify-between items-center'>
      <button
        className='space-y-1 flex flex-col items-start justify-start'
        onClick={() => setShowUserChatInfo(true)}
      >
        <h1 className='font-bold hover:underline underline-offset-2'>
          {chatRecipientInformation?.fullname}
        </h1>
        <div className='text-sm text-gray-500'>
          {chatRecipientInformation?.onLeave ? 'On Leave' : 'Active'}
        </div>
      </button>
      <button className='absolute top-5 right-4' onClick={() => dispatch(closeChat())}>
        <CloseIcon style={{ width: 30, height: 30 }} />
      </button>
    </div>
  )
}
