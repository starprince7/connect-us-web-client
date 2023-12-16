import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from './SideBar'

const DashboardLayout = () => {
  return (
    <div>
      <div className='flex'>
        <SideBar />
        <div className='flex-1 p-2 sm:p-5 bg-white'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
