import { AUTH_ERROR_CODES } from "../constants";

export const AuthErrorHandler = (code: string): string => {
  switch(code) {
    case AUTH_ERROR_CODES.INVALID_CREDENTIAL:
      return 'Invalid Credentials'
    case AUTH_ERROR_CODES.WEEK_PASSWORD:
      return 'Password should be at least 6 characters'
    default:
      return 'Something went wrong.!'
  }
}