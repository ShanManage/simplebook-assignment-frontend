export interface ProductState {
  isLoading: boolean
  status: 'success' | 'error' | 'initial'
  allProducts: ProductDto[]
  product: ProductDto
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

export interface EditProductPayloadDto {
  pathParam: {
    productId: string
  }
  bodyParam: {
    name: string
    description: string
    price: string
    image: string
  }
}
export interface EditProductImagePayloadDto {
  pathParam: {
    productId: string
  }
  bodyParam: FormData
}

export interface EditProductResponseDto {
  message: string
}

export interface GetProductPayloadDto {
  pathParam: {
    productId: string
  }
}

export interface DeleteProductPayloadDto {
  pathParam: {
    productId: string
  }
}
export interface DeleteProductResponseDto {
  message: string
}
export interface ProductDto {
  id: string
  name: string
  description: string
  price: string
  image: string
}