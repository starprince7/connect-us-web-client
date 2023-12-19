import React from 'react'
import { ChatContext } from '../pages/dashboard/teamsPage'
import { HiXCircle as CloseIcon } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { closeChat, fetchConversationStoreAction, selectChat } from '../store/chat/reducer'
import collaborateIllustration from '../assets/illustrations/real_time_collaboration.svg'
import { selectAuth } from '../store/auth/reducer'
import toastService from '../lib/toast-alert'
import apiClient from '../config/api-client'
import { IMessage } from '../types/message'

export const ChatBox = () => {
  const {
    user: { _id },
  } = useSelector(selectAuth)
  const { isChatBoxOpen, activeChatConversation } = useSelector(selectChat)

  const [chatConversation, setChatConversation] = React.useState<IMessage[]>([])

  React.useEffect(() => {
    const reversedArray = [...activeChatConversation].reverse()
    setChatConversation(reversedArray)
  }, [activeChatConversation])

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
      }  z-20 sm:static transition-all ease-in-out duration-100`}
    >
      <div className='pb-16 pt-11 h-screen sm:h-[700px] w-full col-span-2 rounded-2xl relative bg-gray-100 px-5 flex flex-col justify-end'>
        <ChatBoxHeader />
        {/* it renders chat messages inside of chat box */}
        <div className='h-[650px] mt-6 py-10 overflow-y-scroll overflow-x-hidden space-y-3'>
          {chatConversation &&
            chatConversation.map((message) => {
              if (message.author === _id) return <RightTextBlock textContent={message.content} />
              else return <LeftTextBlock textContent={message.content} />
            })}
        </div>
        <ChatBoxInput />
      </div>
    </div>
  )
}

// Chat Text block
function RightTextBlock({ textContent }: { textContent: string }) {
  return (
    <div className='relative p-3 rounded-md w-fit max-w-[65%] sm:max-w-[50%] ml-auto bg-neutral-900 text-white mr-5'>
      <span className='absolute -right-2 rounded-sm top-3 w-10 h-8 rotate-45 bg-neutral-900'></span>
      <p className='w-[92%] py-2 px-1 pr-12'>{textContent}</p>
    </div>
  )
}

// Chat Text block
function LeftTextBlock({ textContent }: { textContent: string }) {
  return (
    <div className='relative p-3 rounded-md w-fit  max-w-[65%] sm:max-w-[50%] bg-gray-300 ml-5'>
      <span className='absolute -left-2 rounded-sm top-3 w-10 h-8 rotate-45 bg-gray-300'></span>
      <p className='w-[92%] ml-auto py-2 px-4'>{textContent}</p>
    </div>
  )
}

function ChatBoxHeader() {
  const dispatch = useDispatch()
  const { setShowUserChatInfo, setShowChatBox } = React.useContext(ChatContext)
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

function ChatBoxInput() {
  const dispatch = useDispatch()
  const { page, pages } = useSelector(selectChat)
  const {
    chatRecipientInformation: { _id },
  } = useSelector(selectChat)
  const [chatMessage, setChatMessage] = React.useState('')
  const [isPostingMessage, setIsPostingMessage] = React.useState(false)
  const handleChatMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsPostingMessage(true)
      const { data } = await apiClient.post(`/chat/${_id}`, { content: chatMessage })
      dispatch(
        fetchConversationStoreAction({
          _id,
          page: pages > page ? Number(page) + 1 : Number(page),
        }) as any,
      )
      setChatMessage('')
    } catch (e: any) {
      setIsPostingMessage(false)
      console.log('Error posting chat message:', e)
      toastService.showErrorMessage('Message failed to send, check your network connection')
    } finally {
      setIsPostingMessage(false)
    }
  }
  return (
    <div className='drop-shadow-xl absolute bottom-2 left-0 w-full px-3 z-10'>
      <form
        onSubmit={handleChatMessageSubmit}
        className='rounded-lg flex items-center border space-x-2 p-1.5 bg-white'
      >
        <input
          type='text'
          className='w-full outline-none px-2 py-2.5'
          placeholder='Write a message...'
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <button type='submit' className='rounded-lg bg-black py-2.5 px-10 font-semibold text-white'>
          {isPostingMessage ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
