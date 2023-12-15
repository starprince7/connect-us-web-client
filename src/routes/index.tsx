import { Route, Routes } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import Welcome from '../pages/welcome'
import { TeamsPage } from '../pages/dashboard/teams'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import ConnectUs from '../components/connectUs/ConnectUs'

export const RootRouter = () => {
  // const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector(authSelector);
  const isLoggedIn = true

  return (
    <Routes>
      <Route path='/*' element={<Welcome />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/connect' element={<ConnectUs />} />
      {!!isLoggedIn && (
        <Route element={<DashboardLayout />}>
          <Route path='/teams' element={<TeamsPage />} />
          <Route path='/messaging' />
          <Route path='/watch' />
        </Route>
      )}
    </Routes>
  )
}
