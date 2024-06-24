export interface UserState {
  isLoading: boolean
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

export interface EditUserInfoPayloadDto {
  bodyParam: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    image: string
  }
}
export interface EditUserImagePayloadDto {
  bodyParam: FormData
}

export interface EditUserInfoResponseDto {
  message: string
}