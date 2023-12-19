import React from 'react'
import { ProfileSideBar } from '../../components/ProfileSideBar'

interface IStaffsLeave {
    setStaffsLeave: React.Dispatch<React.SetStateAction<boolean>>
  }
  export const StaffsLeaveContext = React.createContext({} as IStaffsLeave)


export const StaffsLeavePage = () => {
    const [staffsLeave, setStaffsLeave] = React.useState(false)
  return (
    <div className='space-y-12'>
      <h2 className='text-xl font-bold'>Grant leave</h2>
      <div className='relative sm:flex items-start sm:space-x-2 h-screen'>
      <StaffsLeaveContext.Provider value={{setStaffsLeave}}>
        
      </StaffsLeaveContext.Provider>
      <ProfileSideBar
          isActive={staffsLeave}
          closeProfileBar={() => setStaffsLeave(false)}
        />
      </div>
    </div>
  )
}

