import { AUTH_ERROR_CODES } from "../constants";

export const AuthErrorHandler = (code: string): string => {
  switch(code) {
    case AUTH_ERROR_CODES.INVALID_CREDENTIAL:
      return 'Invalid Credentials'
    default:
      return 'Invalid Credentials'
  }
}