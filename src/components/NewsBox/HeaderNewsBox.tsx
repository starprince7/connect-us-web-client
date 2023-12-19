import { useContext } from 'react'
import { NewsContext } from '../../pages/dashboard/newsPage'

export default function HeaderNewsBox() {
  const { setShowUserNewsRoomInfo } = useContext(NewsContext)
  return (
    <div className='rounded-lg border p-2 absolute top-0 left-0 w-full px-3.5 z-20 bg-white'>
      <button className='space-y-1 flex flex-col items-start justify-start' onClick={() => {}}>
        <h1 className='font-bold hover:underline underline-offset-2'>Broadcast Channel</h1>
        <div className='text-sm text-gray-500'>Live</div>
      </button>
    </div>
  )
}
