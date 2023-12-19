import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectAuth } from '../../store/auth/reducer'
import { getNewsAsyncAction, selectNews } from '../../store/news/reducer'

import RightSideTextBlockNews from './RightSideTextBlock'
import LeftSideTextBlockNews from './LeftSideTextBlock'
import HeaderNewsBox from './HeaderNewsBox'
import InputNewsBox from './InputNewsBox'

export const NewsBox = () => {
  const dispatch = useDispatch()
  const {
    user: { _id, authority },
  } = useSelector(selectAuth)
  const { messages } = useSelector(selectNews)

  const [messageEvents, setMessageEvents] = React.useState<typeof messages>([])

  React.useEffect(() => {
    const reversedArray = [...messages].reverse()
    setMessageEvents(reversedArray)
  }, [messages])

  // fetch all news
  React.useEffect(() => {
    dispatch(getNewsAsyncAction({ page: 1 }) as any)
  }, [])

  return (
    <div className='border min-h-fit w-full col-span-2 rounded-2xl relative bg-gray-100 px-2 transition-all ease-in duration-1000'>
      <HeaderNewsBox />
      <div className='h-[650px] mt-12 pt-7 pb-20 overflow-y-scroll overflow-x-hidden space-y-3'>
        {messageEvents &&
          messageEvents.map((message) => {
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
