import { Route, Routes } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import Welcome from '../pages/welcome'
import { TeamsPage } from '../pages/dashboard/teamsPage'
import { NewsPage } from '../pages/dashboard/newsPage'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/auth/reducer'
import { GrantLeavePage } from '../pages/dashboard/grantLeavePage'
import { SendInviteLinkPage } from '../pages/dashboard/sendInviteLinkPage'
import { StaffsOnLeavePage } from '../pages/dashboard/staffs-on-leave'
import NotFoundPage from '../pages/404'

export const RootRouter = () => {
  const {
    isLoggedIn,
    user: { authority },
  } = useSelector(selectAuth)

  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/*' element={<Login />} />
      {!!isLoggedIn && (
        <Route element={<DashboardLayout />}>
          <Route path='/teams' element={<TeamsPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='*' element={<NotFoundPage />} />
          {authority > 0 && (
            <Route>
              <Route path='/grant-leave' element={<GrantLeavePage />} />
              <Route path='/staffs-on-leave' element={<StaffsOnLeavePage />} />
              <Route path='/create-staff-account' element={<SendInviteLinkPage />} />
            </Route>
          )}
        </Route>
      )}
    </Routes>
  )
}
