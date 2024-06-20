
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {
  Login,
  ProductManagement,
} from '../pages'
import { APP_ROUTES } from '../utils/constants'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={'/'} element={<Login />} />
      <Route path={'/'} >
        <Route
          path={APP_ROUTES.PRODUCT_MANAGEMENT}
          element={<ProductManagement />}
        />
      </Route>
    </Route>
  )
)

const AppRoutes = () => {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>}/>
}
export default AppRoutes
