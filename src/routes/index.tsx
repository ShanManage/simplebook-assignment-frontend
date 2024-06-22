
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {
  Login,
  ProductManagement,
  ProfileManagement,
  Register,
} from '../pages'
import { APP_ROUTES } from '../utils/constants'
import { AppLayout } from '../components'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={APP_ROUTES.ROOT} element={<Login />} />
      <Route path={APP_ROUTES.SIGN_UP} element={<Register />} />
      <Route path={APP_ROUTES.ROOT} element={<AppLayout />}>
        <Route
          path={APP_ROUTES.PRODUCT_MANAGEMENT}
          element={<ProductManagement />}
        />
        <Route
          path={APP_ROUTES.PROFILE_MANAGEMENT}
          element={<ProfileManagement />}
        />
      </Route>
    </Route>
  )
)

const AppRoutes = () => {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>}/>
}
export default AppRoutes
