import React from 'react'

import { ProfileSideBar } from '../../components/layout/ProfileSideBar'
import { NewsBox } from '../../components/NewsBox'

interface IContextNews {
  setShowUserNewsRoomInfo: React.Dispatch<React.SetStateAction<boolean>>
}
export const NewsContext = React.createContext({} as IContextNews)

export const NewsPage = () => {
  const [showUserNewsRoomInfo, setShowUserNewsRoomInfo] = React.useState(false)

  return (
    <div className='space-y-12'>
      <h2 className='text-2xl sm:text-4xl font-bold'>News</h2>
      <div className='relative sm:flex items-start sm:space-x-2 h-screen'>
        {/* it renders a news box component */}
        <NewsContext.Provider value={{ setShowUserNewsRoomInfo }}>
          <NewsBox />
        </NewsContext.Provider>
        <ProfileSideBar
          isActive={showUserNewsRoomInfo}
          closeProfileBar={() => setShowUserNewsRoomInfo(false)}
        />
      </div>
    </div>
  )
}
