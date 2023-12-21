import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from './SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction, selectAuth } from '../../store/auth/reducer'

const DashboardLayout = () => {
  const dispatch = useDispatch()
  const {
    isLoggedIn,
    user: { fullname, email, authority },
  } = useSelector(selectAuth)

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(logoutAction())
    }
  }, [isLoggedIn])

  return (
    <div>
      <div className='flex max-h-screen overflow-hidden relative'>
        <div className='absolute right-14 top-4 z-20'>
          <p className='font-bold mb-1 text-neutral-800'>Welcome back, {fullname}</p>
          <p className='text-neutral-500'>{email}</p>
          {authority > 0 && (
            <p className='text-neutral-700 italic text-xs mt-1 underline'>
              Special features are now unlocked at the sidebar menu
            </p>
          )}
        </div>
        <SideBar />
        <div className='flex-1 p-2 sm:p-5 bg-white'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
