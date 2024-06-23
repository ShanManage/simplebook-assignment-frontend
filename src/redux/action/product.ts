/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateProductPayloadDto } from "../../interfaces";
import { productService } from "../../services/product";
import { createAlert } from "../slice";

export const createProduct = createAsyncThunk(
  'product/create-product',
  async (payload: CreateProductPayloadDto, { dispatch }) => {
    try {
      const createdProductResponse = await productService.createProduct(payload)
      
      dispatch(createAlert({
        message: 'Product added successfully',
        type: 'success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      
      return createdProductResponse;
    } catch (error: any) {
      dispatch(createAlert({
        message: error.message,
        type: 'error',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      }));
      throw new Error(error.message);
    }
  }
)

export const productAction = {
  createProduct
}