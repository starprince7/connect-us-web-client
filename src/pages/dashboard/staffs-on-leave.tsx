import { IStaff } from '../../types/staff'
import AvatarChatMan from '../../assets/icons/chat-man-avatar.svg'
import AvatarChatWoman from '../../assets/icons/chat-woman-avatar.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { endStaffLeave, fetchStaffsOnLeave, selectStaffs } from '../../store/staffs/reducer'
import { LoadingPersonSkeleton } from '../../components/skeleton/PersonLoader'

export const StaffsOnLeavePage = () => {
  return (
    <div className='space-y-12'>
      <h2 className='text-xl font-bold capitalize'>Staffs on leave</h2>
      <div className='relative sm:flex items-start sm:space-x-2 h-screen'>
        <AllStaffsOnLeave />
      </div>
    </div>
  )
}

function AllStaffsOnLeave() {
  const dispatch = useDispatch()
  const { staffsOnLeave, requestStatus } = useSelector(selectStaffs)
  useEffect(() => {
    dispatch(fetchStaffsOnLeave({ page: 1 }) as any)
  }, [])

  return (
    <div className='border min-h-full w-full col-span-2 rounded-2xl relative bg-gray-100 p-5'>
      {requestStatus === 'loading' && !staffsOnLeave.length && (
        <div className='flex flex-col space-y-3'>
          <LoadingPersonSkeleton className='w-[90vw] mx-3 sm:w-96' />
        </div>
      )}
      {!!staffsOnLeave.length && staffsOnLeave.map((staff) => <Staff {...staff} key={staff._id} />)}
    </div>
  )
}

function Staff({ _id, fullname, leave, gender = 'M', email }: IStaff) {
  const dispatch = useDispatch()
  const { requestStatus } = useSelector(selectStaffs)
  const [staffId, setStaffId] = useState('')

  const handleEndLeave = (id: string) => {
    setStaffId(id)
    dispatch(endStaffLeave({ id }) as any)
  }

  return (
    <div
      className={`relative pt-10 mb-2 sm:mb-3 flex items-center space-x-3 border w-[90vw] mx-3 sm:w-96 p-5 rounded-lg bg-white`}
    >
      <button
        disabled={requestStatus === 'loading'}
        onClick={() => handleEndLeave(_id)}
        className='absolute right-3 top-2.5 z-20 px-1.5 py-1 rounded text-white text-xs font-semibold bg-rose-600'
      >
        {staffId === _id && requestStatus === 'loading' ? '...' : 'End this leave'}
      </button>
      <div>
        <img src={gender === 'M' ? AvatarChatMan : AvatarChatWoman} alt='avatar image' />
      </div>
      <div className='space-y-0.5'>
        <p className='font-bold'>{fullname}</p>
        <p className='text-sm'>{email}</p>
      </div>
    </div>
  )
}
