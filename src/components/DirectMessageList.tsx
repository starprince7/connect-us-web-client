import React, { useEffect } from 'react'
import AvatarChatMan from '../assets/icons/chat-man-avatar.svg'
import AvatarChatWoman from '../assets/icons/chat-woman-avatar.svg'
import { useDispatch } from 'react-redux'
import { openChat, setActiveConversation } from '../store/chat/reducer'
import axios from 'axios'

// It renders a list of persons.
export function DirectMessageList() {
  return (
    <div className='space-y-4 mt-5 max-w-fit'>
      <h2 className='text-sm font-semibold mb-10'>Direct Messages</h2>
      {Array(5)
        .fill('')
        .map((_, i) => (
          <Person key={i} />
        ))}
    </div>
  )
}

// it fetches message conversation history with just this person
function Person() {
  const MESSAGES_URI = ''
  const dispatch = useDispatch()
  const [messageConversations, setMessageConversation] = React.useState([])

  useEffect(() => {
    async function fetchConversation() {
      const { data } = await axios.get(MESSAGES_URI)
      setMessageConversation(data.messages)
    }
    // fetchConversation()
  }, [])

  return (
    <div
      className='flex items-center space-x-3 border w-full sm:w-64 p-5 rounded-lg bg-gray-100'
      onClick={() => {
        dispatch(openChat())
        dispatch(setActiveConversation(messageConversations))
      }}
    >
      <div>
        <img src={AvatarChatMan} alt='avatar image' />
      </div>
      <div className='space-y-0.5'>
        <p className='font-bold'>Guy Hawkins</p>
        <p className='text-sm'>Last seen</p>
      </div>
    </div>
  )
}
