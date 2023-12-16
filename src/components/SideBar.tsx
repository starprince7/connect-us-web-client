import React from 'react'
import TeamIcon from '../assets/icons/teams-icon.svg'
import NewsIcon from '../assets/icons/news-icon.svg'
import LogoutIcon from '../assets/icons/logout-icon.svg'
import LogoDashboard from '../assets/icons/logo-dashboard.svg'
import { Link, useLocation } from 'react-router-dom'

export const SideBar = () => {
  const location = useLocation()
  const currentRoute = location.pathname

  return (
    <div className='border w-60 space-y-8 px-5 py-5 min-h-screen'>
      <h3>
        <img src={LogoDashboard} alt='logo' className='h-14' />
      </h3>
      <h3 className='font-bold text-sm'>Menu</h3>
      {/* it renders links */}
      <div className='space-y-3'>
        {links.map(({ name, icon }) => {
          const isActiveRoute = '/' + name === currentRoute
          return (
            <Link
              to={name}
              className={`${
                isActiveRoute ? 'bg-gray-200 shadow-lg' : 'bg-gray-50'
              } hover:bg-gray-200 flex space-x-3 items-center w-44 p-4 rounded-lg`}
            >
              <img src={icon} alt='icon' className='h-5' />
              <span className='capitalize'>{name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

const links = [
  { name: 'teams', icon: TeamIcon },
  { name: 'news', icon: NewsIcon },
  { name: 'logout', icon: LogoutIcon },
]
