import React from 'react'
import { SendInviteLink } from '../../components/ui/SendInviteLink'
import { ProfileSideBar } from '../../components/ProfileSideBar'

interface ISendInviteLink {
    setSendInvite: React.Dispatch<React.SetStateAction<boolean>>
  }
  export const SendInviteLinkContext = React.createContext({} as ISendInviteLink)


export const SendInviteLinkPage = () => {
    const [sendInvite, setSendInvite] = React.useState(false)
  return (
    <div className='space-y-12'>
      <h2 className='text-xl font-bold'>Create Sign up link</h2>
      <div className='relative sm:flex items-start sm:space-x-2 h-screen'>
      <SendInviteLinkContext.Provider value={{setSendInvite}}>
        <SendInviteLink />
      </SendInviteLinkContext.Provider>
      {/* <ProfileSideBar
          isActive={sendInvite}
          closeProfileBar={() => setSendInvite(false)}
        /> */}
      </div>
    </div>
  )
}

