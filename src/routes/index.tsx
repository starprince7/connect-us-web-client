import { Route, Routes } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import Welcome from '../pages/welcome'
import { TeamsPage } from '../pages/dashboard/teams'
import { NewsPage } from '../pages/dashboard/news'

export const RootRouter = () => {
  // const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector(authSelector);
  const isLoggedIn = true

  return (
    <Routes>
      <Route path='/*' element={<Welcome />} />
      <Route path='/login' />
      <Route path='/signUp' />
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
