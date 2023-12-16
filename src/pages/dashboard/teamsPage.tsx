import React from 'react'
import AvatarChatMan from '../../assets/icons/chat-man-avatar.svg'
import AvatarChatWoman from '../../assets/icons/chat-woman-avatar.svg'
import { ChatBox } from '../../components/ChatBox'
import { ProfileSideBar } from '../../components/ProfileSideBar'

interface IChatContext {
  setShowUserChatInfo: React.Dispatch<React.SetStateAction<boolean>>
}
export const ChatContext = React.createContext({} as IChatContext)

export const TeamsPage = () => {
  const [showUserChatInfo, setShowUserChatInfo] = React.useState(false)
  return (
    <div className='space-y-12'>
      <h2 className='text-4xl font-bold'>Teams</h2>
      {/* it renders <Other's teams /> component */}
      <div className='sm:flex items-start sm:space-x-2 h-screen'>
        {/* it renders direct message list */}
        {/* Ite renders other teams component */}
        <DirectMessageList />
        <ChatContext.Provider value={{ setShowUserChatInfo }}>
          <ChatBox />
        </ChatContext.Provider>
        <ProfileSideBar
          isActive={showUserChatInfo}
          closeProfileBar={() => setShowUserChatInfo(false)}
        />
      </div>
    </div>
  )
}

function DirectMessageList() {
  return (
    <div className='space-y-4 mt-5 max-w-fit'>
      <h2 className='text-sm font-semibold mb-10'>Direct Messages</h2>
      {Array(5)
        .fill('')
        .map((_, i) => (
          <div
            key={i}
            className='flex items-center space-x-3 border w-64 p-5 rounded-lg bg-gray-100'
          >
            <div>
              <img src={AvatarChatMan} alt='avatar image' />
            </div>
            <div className='space-y-0.5'>
              <p className='font-bold'>Guy Hawkins</p>
              <p className='text-sm'>Last seen</p>
            </div>
          </div>
        ))}
    </div>
  )
}
