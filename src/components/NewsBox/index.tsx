import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectAuth } from '../../store/auth/reducer'
import { getNewsAsyncAction, selectNews } from '../../store/news/reducer'

import RightSideTextBlockNews from './RightSideTextBlock'
import LeftSideTextBlockNews from './LeftSideTextBlock'
import HeaderNewsBox from './HeaderNewsBox'
import InputNewsBox from './InputNewsBox'

export const NewsBox = () => {
  const {
    user: { _id, authority },
  } = useSelector(selectAuth)
  const { messages, requestStatus } = useSelector(selectNews)
  const [inComponentMessages, setInComponentMessages] = React.useState(messages)
  const [windowHeight, setWindowHeight] = React.useState(0)

  const dispatch = useDispatch()
  const chatContainerRef = React.useRef<HTMLDivElement>(null)

  // fetch all news
  React.useEffect(() => {
    dispatch(getNewsAsyncAction({ page: 1 }) as any)
    setWindowHeight(window.innerHeight - 280)
  }, [])

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  React.useEffect(() => {
    messages.length && setInComponentMessages(messages)
    setTimeout(() => scrollToBottom(), 100)
  }, [messages, requestStatus])

  return (
    <div className='border min-h-fit w-full col-span-2 rounded-2xl relative bg-gray-100 px-2 transition-all ease-in duration-1000'>
      <HeaderNewsBox />
      <div
        ref={chatContainerRef}
        className='xl:h-[650px] lg:h-[550px] sm:h-[420px] mt-12 pt-7 pb-9 mb-28 overflow-y-scroll overflow-x-hidden space-y-3 scroll-smooth'
        style={{
          minHeight: `${windowHeight}px`,
          maxHeight: `${windowHeight}px`,
        }}
      >
        {requestStatus === 'loading' && (
          <div className='absolute top-16 pt-6 left-0 z-20 w-full'>
            <p className='mx-auto my-2 text-sm w-full text-center'>Loading chats...</p>
          </div>
        )}
        {!!inComponentMessages.length &&
          inComponentMessages.map((message) => {
            if (message.user === _id && authority > 0)
              return (
                <RightSideTextBlockNews
                  key={message._id}
                  textContent={message.content}
                  title={message.title}
                  isSystem={message.system}
                />
              )
            else
              return (
                <LeftSideTextBlockNews
                  key={message._id}
                  title={message.title}
                  textContent={message.content}
                  isSystem={message.system}
                />
              )
          })}
      </div>
      {authority > 0 && <InputNewsBox />}
    </div>
  )
}
