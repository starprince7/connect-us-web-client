import { SendInviteLink } from '../../components/SendInviteLink'

export const SendInviteLinkPage = () => {
  return (
    <div className='space-y-12'>
      <h2 className='text-xl font-bold'>Create Staff Account</h2>
      <div className='relative sm:flex items-start sm:space-x-2 h-screen'>
        <SendInviteLink />
      </div>
    </div>
  )
}
