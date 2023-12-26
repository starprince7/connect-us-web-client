import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { logoutAction, selectAuth } from '../../store/auth/reducer'
import { selectApp, toggleSideBar } from '../../store/app/reducer'

import apiClient from '../../config/api-client'
import toastService from '../../lib/toast-alert'

import TeamIcon from '../../assets/icons/teams-icon.svg'
import NewsIcon from '../../assets/icons/news-icon.svg'
import LogoutIcon from '../../assets/icons/logout-icon.svg'
import LogoDashboard from '../../assets/icons/logo-dashboard.svg'
import CreateLinkIcon from '../../assets/icons/create-link-icon.svg'
import GrantLeaveIcon from '../../assets/icons/grant-leave-icon.svg'
import StaffsOnLeaveIcon from '../../assets/icons/staffs-leave-icon.svg'

export const SideBar = () => {
  const dispatch = useDispatch()
  const { sideBarOpen } = useSelector(selectApp)
  const { pathname: currentRoute } = useLocation()

  const {
    user: { authority },
  } = useSelector(selectAuth)

  const handleLogOut = async () => {
    const { data } = await apiClient.post('/users/logout')
    if (data.message) {
      dispatch(toggleSideBar(false))
      dispatch(logoutAction())
      toastService.showInfoMessage(data.message)
    }
  }

  return (
    <div
      className={`border  ${
        sideBarOpen
          ? 'absolute sm:static top-0 left-0 w-60 z-30 border bg-gray-50'
          : '-ml-52 opacity-0 sm:opacity-100 md:ml-0 md:block '
      } overflow-hidden sm:w-60 space-y-8 px-5 py-5 min-h-screen transition-all ease-in-out duration-100`}
    >
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
                onClick={() => handleLogOut()}
                className={`${
                  isAuthorized && isActiveRoute ? 'bg-gray-200 shadow-md' : 'bg-gray-50'
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
                  isActiveRoute ? 'bg-gray-200 shadow-md' : 'bg-gray-50'
                } hover:bg-gray-200 flex space-x-3 items-center w-44 p-4 rounded-lg`}
                onClick={() => dispatch(toggleSideBar(false))}
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
