import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../interfaces";
import { createProduct, editProduct, editProductImage, getAllProducts, getProduct } from "../action";

const initialState: ProductState = {
  isLoading: false,
  status: 'initial',
  allProducts: [],
  product: {
    id: "",
    name: "",
    description: "",
    price: "",
    image: ""
  }
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductStatus: (state) => {
      state.status = 'initial'
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending, (state) => {
      state.isLoading = true
      state.status = 'initial'
    })
    .addCase(createProduct.fulfilled, (state) => {
      state.isLoading = false
      state.status = 'success'
    })
    .addCase(createProduct.rejected, (state) => {
      state.isLoading = false
      state.status = 'error'
    })
    .addCase(editProduct.pending, (state) => {
      state.isLoading = true
      state.status = 'initial'
    })
    .addCase(editProduct.fulfilled, (state) => {
      state.isLoading = false
      state.status = 'success'
    })
    .addCase(editProduct.rejected, (state) => {
      state.isLoading = false
      state.status = 'error'
    })
    .addCase(editProductImage.pending, (state) => {
      state.isLoading = true
      state.status = 'initial'
    })
    .addCase(editProductImage.fulfilled, (state) => {
      state.isLoading = false
      state.status = 'success'
    })
    .addCase(editProductImage.rejected, (state) => {
      state.isLoading = false
      state.status = 'error'
    })
    .addCase(getAllProducts.pending, (state) => {
      state.allProducts = []
      state.isLoading = true
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload.data
      state.isLoading = false
    })
    .addCase(getAllProducts.rejected, (state) => {
      state.allProducts = []
      state.isLoading = false
    })
    .addCase(getProduct.pending, (state) => {
      state.product = initialState.product
      state.isLoading = true
    })
    .addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload.data
      state.isLoading = false
    })
    .addCase(getProduct.rejected, (state) => {
      state.product = initialState.product
      state.isLoading = false
    })
  }
})

export const {
  clearProductStatus
} = productSlice.actions

export default productSlice.reducer;