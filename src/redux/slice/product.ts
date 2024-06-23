import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../interfaces";
import { createProduct } from "../action";

const initialState: ProductState = {
  isLoading: false,
  status: 'initial'
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
  }
})

export default productSlice.reducer;