import { Route, Routes } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import Welcome from '../pages/welcome'
import { TeamsPage } from '../pages/dashboard/teamsPage'
import { NewsPage } from '../pages/dashboard/newsPage'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/auth/reducer'

export const RootRouter = () => {
  const { isLoggedIn } = useSelector(selectAuth)

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/*' element={<Welcome />} />
      {!!isLoggedIn && (
        <Route element={<DashboardLayout />}>
          <Route path='/teams' element={<TeamsPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/watch' />
        </Route>
      )}
    </Routes>
  )
}
