export interface ProductState {
  isLoading: boolean
  status: 'success' | 'error' | 'initial'
}

export interface ProductsFormFields {
  name: string
  description: string
  price: string
  image: File
}

export interface CreateProductPayloadDto {
  bodyParam: FormData
}

export interface CreateProductResponseDto {
  message: string
}