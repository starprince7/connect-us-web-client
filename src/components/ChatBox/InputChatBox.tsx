import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import apiClient from '../../config/api-client'
import toastService from '../../lib/toast-alert'
import { fetchConversationStoreAction, selectChat } from '../../store/chat/reducer'

export default function InputChatBox() {
  const dispatch = useDispatch()
  const { page, pages } = useSelector(selectChat)
  const {
    chatRecipientInformation: { _id },
  } = useSelector(selectChat)
  const [chatMessage, setChatMessage] = useState('')
  const [isPostingMessage, setIsPostingMessage] = useState(false)

  const handleChatMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsPostingMessage(true)
      const { data } = await apiClient.post(`/chat/${_id}`, { content: chatMessage })
      dispatch(
        fetchConversationStoreAction({
          _id,
          page: pages > page ? page + 1 : page,
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
