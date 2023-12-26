import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { HiMenuAlt3 as MenuIcon } from 'react-icons/hi'
import { SideBar } from './SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction, selectAuth } from '../../store/auth/reducer'
import { selectApp, toggleSideBar } from '../../store/app/reducer'

const DashboardLayout = () => {
  const dispatch = useDispatch()
  const {
    isLoggedIn,
    user: { fullname, email, authority },
  } = useSelector(selectAuth)
  const { sideBarOpen } = useSelector(selectApp)

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(logoutAction())
    }
  }, [isLoggedIn])

  return (
    <div>
      <div className='flex max-h-screen overflow-hidden relative'>
        {/* it renders a side menu button */}
        <button
          onClick={() => dispatch(toggleSideBar(!sideBarOpen))}
          className='absolute right-3 top-4 z-10 sm:hidden'
        >
          <MenuIcon className='w-7 h-6 text-gray-900' />
        </button>
        <div className='absolute right-3 sm:right-14 top-14 sm:top-4 z-20 text-right'>
          <p className='text-sm sm:text-base font-bold mb-1 text-neutral-800'>
            Welcome back, {fullname}
          </p>
          <p className='text-neutral-500 text-xs sm:text-sm'>{email}</p>
          {authority > 0 && (
            <p className='text-xs hidden md:block sm:text-base text-neutral-700 italic mt-1 underline'>
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
