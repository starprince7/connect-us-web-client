import React from 'react'
import { ProfileSideBar } from '../../components/ProfileSideBar'
import { GrantLeave } from '../../components/GrantLeave'

interface IGrantLeave {
    setGrantLeave: React.Dispatch<React.SetStateAction<boolean>>
  }
  export const GrantLeaveContext = React.createContext({} as IGrantLeave)


export const GrantLeavePage = () => {
    const [grantLeave, setGrantLeave] = React.useState(false)
  return (
    <div className='space-y-12'>
      <h2 className='text-xl font-bold'>Grant leave</h2>
      <div className='relative sm:flex items-start sm:space-x-2 h-screen'>
      <GrantLeaveContext.Provider value={{setGrantLeave}}>
        <GrantLeave />
      </GrantLeaveContext.Provider>
      <ProfileSideBar
          isActive={grantLeave}
          closeProfileBar={() => setGrantLeave(false)}
        />
      </div>
    </div>
  )
}

