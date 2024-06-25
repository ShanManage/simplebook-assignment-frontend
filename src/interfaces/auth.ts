export interface AuthState {
  isLoading: boolean
  isAuthorized: boolean,
}

export interface LoginFormFields {
  username: string
  password: string
}

export interface SignUpFormFields {
  firstName: string
  lastName: string
  username: string
  password: string
  confirmPassword: string
}

export interface CreateNewUserPayloadDto {
  bodyParam: {
    email: string
    firstName: string
    lastName: string
  }
}

export interface CreateNewUserResponseDto {
  message: string
}