export enum APP_ROUTES {
  ROOT = '/',
  SIGN_UP = '/sign-up',
  PRODUCT_MANAGEMENT = '/product-management',
  CREATE_PRODUCT = '/create-product',
  EDIT_PRODUCT = '/edit-product/:id',
  PROFILE_MANAGEMENT = '/profile-management'
}

export const getEditProductRoute = (id: string): string => {
  return `/edit-product/${id}`
}
