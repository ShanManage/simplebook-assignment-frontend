export interface UserState {
  isLoading: boolean
  status: 'success' | 'error' | 'initial'
  user: UserDto
}

export interface UserDto {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  image: string
  id: string
}

export interface UserFormFields {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  image: File
}