/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateProductPayloadDto, DeleteProductPayloadDto, EditProductImagePayloadDto, EditProductPayloadDto, GetProductPayloadDto } from "../../interfaces";
import { productService } from "../../services/product";
import { createAlert } from "../slice/alert";

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

export const editProduct = createAsyncThunk(
  'product/edit-product',
  async (payload: EditProductPayloadDto, { dispatch }) => {
    try {
      const editedProductResponse = await productService.editProduct(payload)
      
      dispatch(createAlert({
        message: 'Product edited successfully',
        type: 'success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      
      return editedProductResponse;
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

export const editProductImage = createAsyncThunk(
  'product/edit-product-image',
  async (payload: EditProductImagePayloadDto, { dispatch }) => {
    try {
      const editedProductResponse = await productService.editProductImage(payload)
      
      dispatch(createAlert({
        message: 'Product image edited successfully',
        type: 'success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      
      return editedProductResponse;
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

export const getAllProducts = createAsyncThunk(
  'product/all-products',
  async () => {
    try {
      const allProductsResponse = await productService.getAllProducts()
      
      return allProductsResponse;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
)

export const getProduct = createAsyncThunk(
  'product/get-product',
  async (payload: GetProductPayloadDto) => {
    try {
      const productResponse = await productService.getProduct(payload)
      
      return productResponse;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'product/delete-product',
  async (payload: DeleteProductPayloadDto, { dispatch }) => {
    try {
      const productResponse = await productService.deleteProduct(payload)
      
      dispatch(createAlert({
        message: 'Product deleted successfully',
        type: 'success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      
      return productResponse;
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
  createProduct,
  editProduct,
  editProductImage,
  getAllProducts,
  getProduct,
  deleteProduct
}