import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../interfaces";
import { createProduct, getAllProducts } from "../action";

const initialState: ProductState = {
  isLoading: false,
  status: 'initial',
  allProducts: []
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
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
  }
})

export default productSlice.reducer;