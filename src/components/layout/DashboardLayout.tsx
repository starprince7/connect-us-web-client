import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from './SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction, selectAuth } from '../../store/auth/reducer'

const DashboardLayout = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(selectAuth)
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(logoutAction())
    }
  }, [isLoggedIn])
  return (
    <div>
      <div className='flex max-h-screen overflow-hidden'>
        <SideBar />
        <div className='flex-1 p-2 sm:p-5 bg-white'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
