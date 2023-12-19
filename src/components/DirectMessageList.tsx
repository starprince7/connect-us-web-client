import React, { useEffect } from 'react'
import AvatarChatMan from '../assets/icons/chat-man-avatar.svg'
import AvatarChatWoman from '../assets/icons/chat-woman-avatar.svg'
import { useDispatch, useSelector } from 'react-redux'
import { openChat, setActiveConversation, setChatRecipientInformation } from '../store/chat/reducer'
import { fetchStaffs, selectStaffs } from '../store/staffs/reducer'
import apiClient from '../config/api-client'
import { IStaff } from '../types/staff'
import { IMessage } from '../types/message'
import { LoadingPersonSkeleton } from './skeleton/PersonLoader'

// It renders a list of persons.
export function DirectMessageList() {
  const dispatch = useDispatch()
  const { staffs, page, requestStatus, hasMore } = useSelector(selectStaffs)
  console.log('staffs:', staffs)

  const loadStaffs = () => {
    dispatch(fetchStaffs({ page: page + 1 }) as any)
  }

  useEffect(() => {
    loadStaffs()
  }, [])

  return (
    <div className='space-y-4 mt-5 max-w-fit'>
      <h2 className='text-sm font-semibold mb-10'>Direct Messages</h2>
      {requestStatus === 'loading' && !staffs.length && <LoadingPersonSkeleton />}
      {staffs.map((staff, i) => (
        <Person key={i} {...staff} />
      ))}
    </div>
  )
}

// it fetches message conversation history with just this person
function Person({ _id, fullname, leave, gender, email }: IStaff) {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const [messageConversations, setMessageConversation] = React.useState<IMessage[]>([])
  const [page, setPage] = React.useState(0)
  console.log('Conversation for ', fullname, ': +', messageConversations)

  async function fetchConversation({ page }: { page: number }) {
    setLoading(true)
    const { data } = await apiClient.get(`/chat/${_id}?page=${page}`)
    setLoading(false)
    if (page === 1) {
      setMessageConversation(data.data)
    } else {
      setMessageConversation([...messageConversations, ...data.data])
    }
    setPage(data.page)
  }

  useEffect(() => {
    fetchConversation({ page: 1 })
  }, [])

  if (loading) {
    return <LoadingPersonSkeleton />
  }

  return (
    <div
      className='flex items-center space-x-3 border w-[90vw] mx-3 sm:w-64 p-5 rounded-lg bg-gray-100'
      onClick={() => {
        dispatch(openChat())
        dispatch(setActiveConversation({ page: Number(page), messageConversations }))
        dispatch(setChatRecipientInformation({ email, fullname, onLeave: leave, _id }))
      }}
    >
      <div>
        <img src={gender === 'M' ? AvatarChatMan : AvatarChatWoman} alt='avatar image' />
      </div>
      <div className='space-y-0.5'>
        <p className='font-bold'>{fullname}</p>
        <p className='text-sm'>{leave ? 'On Leave' : 'Active'}</p>
      </div>
    </div>
  )
}
