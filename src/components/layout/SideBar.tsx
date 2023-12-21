import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { logoutAction, selectAuth } from '../../store/auth/reducer'

import TeamIcon from '../../assets/icons/teams-icon.svg'
import NewsIcon from '../../assets/icons/news-icon.svg'
import LogoutIcon from '../../assets/icons/logout-icon.svg'
import LogoDashboard from '../../assets/icons/logo-dashboard.svg'
import CreateLinkIcon from '../../assets/icons/create-link-icon.svg'
import GrantLeaveIcon from '../../assets/icons/grant-leave-icon.svg'
import StaffsOnLeaveIcon from '../../assets/icons/staffs-leave-icon.svg'

export const SideBar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const currentRoute = location.pathname

  const {
    user: { authority },
  } = useSelector(selectAuth)

  return (
    <div className='border hidden md:block overflow-hidden sm:w-60 space-y-8 px-5 py-5 min-h-screen'>
      <h3>
        <img src={LogoDashboard} alt='logo' className='h-14' />
      </h3>
      <h3 className='font-bold text-sm'>Menu</h3>
      <div className='space-y-3'>
        {links.map(({ name, icon, linkAuthority }) => {
          const isAuthorized = linkAuthority === undefined || authority >= linkAuthority
          const isActiveRoute = '/' + name === currentRoute

          if (name === 'logout') {
            return (
              <button
                key={name}
                type='button'
                onClick={() => dispatch(logoutAction())}
                className={`${
                  isAuthorized && isActiveRoute ? 'bg-gray-200 shadow-lg' : 'bg-gray-50'
                } hover:bg-gray-200 flex space-x-3 items-center w-44 p-4 rounded-lg`}
              >
                <img src={icon} alt='icon' className='h-5' />
                <span className='capitalize'>{name}</span>
              </button>
            )
          }

          return (
            isAuthorized && (
              <Link
                key={name}
                to={name}
                className={`${
                  isActiveRoute ? 'bg-gray-200 shadow-lg' : 'bg-gray-50'
                } hover:bg-gray-200 flex space-x-3 items-center w-44 p-4 rounded-lg`}
              >
                <img src={icon} alt='icon' className='h-5' />
                <span className='capitalize'>{name.split('-').join(' ')}</span>
              </Link>
            )
          )
        })}
      </div>
    </div>
  )
}

const links = [
  { name: 'teams', icon: TeamIcon, linkAuthority: 0 },
  { name: 'news', icon: NewsIcon, linkAuthority: 0 },
  { name: 'create-staff-account', icon: CreateLinkIcon, linkAuthority: 1 },
  { name: 'grant-leave', icon: GrantLeaveIcon, linkAuthority: 1 },
  { name: 'staffs-on-leave', icon: StaffsOnLeaveIcon, linkAuthority: 1 },
  { name: 'logout', icon: LogoutIcon },
]
