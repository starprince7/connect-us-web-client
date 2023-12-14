import { Route, Routes } from 'react-router-dom'
import PrivateLayout from '../components/PrivateLayout'
import Welcome from '../pages/welcome'
import { TeamsPage } from '../pages/dashboard/teams'

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
        <Route path='/dashboard' element={<PrivateLayout />}>
          <Route path='/teams' element={<TeamsPage />} />
          <Route path='/messaging' />
          <Route path='/watch' />
        </Route>
      )}
    </Routes>
  )
}
