import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import collaborateIllustration from '../../assets/illustrations/real_time_collaboration.svg'

import HeaderChatBox from './HeaderChatBox'
import InputChatBox from './InputChatBox'
import RightSideTextBlockChat from './RightSideTextBox'
import LeftSideTextBlockChat from './LeftSideTextBox'

import { selectChat } from '../../store/chat/reducer'
import { selectAuth } from '../../store/auth/reducer'

export const ChatBox = () => {
  const {
    user: { _id },
  } = useSelector(selectAuth)
  const { isChatBoxOpen, activeChatConversation } = useSelector(selectChat)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const endMessagesRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
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
      <div className='pb-16 pt-11 h-screen sm:max-h-[600px] md:max-h-[700px] w-full col-span-2 rounded-2xl relative bg-gray-100 px-5 flex flex-col justify-end'>
        <HeaderChatBox />
        {/* it renders chat messages inside of chat box */}
        <div
          ref={chatContainerRef}
          className='h-[650px] mt-6 py-10 overflow-y-scroll overflow-x-hidden space-y-3 scroll-smooth'
        >
          {activeChatConversation.length > 0 &&
            activeChatConversation.map((message) => {
              if (message.author === _id)
                return <RightSideTextBlockChat key={message._id} textContent={message.content} />
              else return <LeftSideTextBlockChat key={message._id} textContent={message.content} />
            })}
        </div>
        <InputChatBox />
      </div>
    </div>
  )
}
