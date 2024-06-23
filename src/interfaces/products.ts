export interface ProductState {
  isLoading: boolean
  status: 'success' | 'error' | 'initial'
  allProducts: ProductDto[]
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

export interface ProductDto {
  id: string
  name: string
  description: string
  price: string
  image: string
}