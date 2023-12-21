import { GrantLeave } from '../../components/GrantLeave'

export const GrantLeavePage = () => {
  return (
    <div className='space-y-12'>
      <h2 className='text-xl font-bold'>Grant leave</h2>
      <div className='relative sm:flex items-start sm:space-x-2 h-screen'>
        <GrantLeave />
      </div>
    </div>
  )
}
