import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import HeaderChatBox from './HeaderChatBox'
import InputChatBox from './InputChatBox'
import RightSideTextBlockChat from './RightSideTextBox'
import LeftSideTextBlockChat from './LeftSideTextBox'
import collaborateIllustration from '../../assets/illustrations/real_time_collaboration.svg'

import { fetchConversationForScrolling, selectChat } from '../../store/chat/reducer'
import { selectAuth } from '../../store/auth/reducer'

export const ChatBox = () => {
  const {
    user: { _id },
  } = useSelector(selectAuth)
  const {
    isChatBoxOpen,
    activeChatConversation,
    page,
    hasMore,
    requestStatus,
    chatRecipientInformation,
  } = useSelector(selectChat)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const [showLoadMore, setShowLoadMore] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
    setWindowHeight(window.innerHeight - 150)
  }, [activeChatConversation])

  const handleScroll = () => {
    if (chatContainerRef.current) {
      // Check if the scroll bar is at the top
      const isAtTop = chatContainerRef.current.scrollTop === 0

      if (isAtTop && hasMore) {
        setShowLoadMore(true)
      }
    }
  }

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
      <div className='pb-16 pt-11 w-full col-span-2 rounded-2xl relative bg-gray-100 px-5 flex flex-col justify-end'>
        <HeaderChatBox />
        {/* it renders chat messages inside of chat box */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className='lg:h-[650px] sm:h-[520px] mt-6 py-10 overflow-y-scroll overflow-x-hidden space-y-3 scroll-smooth'
          style={{
            minHeight: `${windowHeight}px`,
            maxHeight: `${windowHeight}px`,
          }}
        >
          {false && (
            <button
              onClick={() =>
                dispatch(
                  fetchConversationForScrolling({
                    page: page + 1,
                    _id: chatRecipientInformation._id,
                  }) as any,
                )
              }
              className='p-2 rounded border mx-auto block'
            >
              Load More
            </button>
          )}
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
