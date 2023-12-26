import React from 'react'
import { ChatBox } from '../../components/ChatBox'
import { ProfileSideBar } from '../../components/layout/ProfileSideBar'
import { DirectMessageList } from '../../components/DirectMessageList'

interface IChatContext {
  showChatBox: boolean
  setShowChatBox: React.Dispatch<React.SetStateAction<boolean>>
  setShowUserChatInfo: React.Dispatch<React.SetStateAction<boolean>>
}
export const ChatContext = React.createContext({} as IChatContext)

export const TeamsPage = () => {
  const [showUserChatInfo, setShowUserChatInfo] = React.useState(false)
  const [showChatBox, setShowChatBox] = React.useState(false)

  return (
    <div className='space-y-12'>
      {/* <button>Menu</button> */}
      <h2 className='text-2xl sm:text-4xl font-bold'>Teams</h2>
      {/* it renders <Other's teams /> component */}
      <div className='sm:flex items-start sm:space-x-4 h-screen'>
        <DirectMessageList />
        <ChatContext.Provider value={{ setShowUserChatInfo, showChatBox, setShowChatBox }}>
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
