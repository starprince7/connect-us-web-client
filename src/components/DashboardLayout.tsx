import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div>
      <p className='text-red-500'>Side bar</p>
      <Outlet />
    </div>
  )
}

export default DashboardLayout
