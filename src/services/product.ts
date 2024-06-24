import { AxiosResponse } from "axios";
import { 
  CreateProductPayloadDto,
  CreateProductResponseDto,
  GetProductPayloadDto,
  ProductDto,
} from "../interfaces";
import { axiosPrivateInstance } from ".";

const createProduct = async (
  payload: CreateProductPayloadDto,
): Promise<AxiosResponse<CreateProductResponseDto>> => {
  const { bodyParam } = payload;
  try {
    const res: AxiosResponse<CreateProductResponseDto> = await axiosPrivateInstance.post('/api/products', bodyParam);
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

const getAllProducts = async (): Promise<AxiosResponse<ProductDto[]>> => {
  try {
    const res: AxiosResponse<ProductDto[]> = await axiosPrivateInstance.get('/api/products');
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

const getProduct = async (payload: GetProductPayloadDto): Promise<AxiosResponse<ProductDto>> => {
  try {
    const { productId } = payload.pathParam
    const res: AxiosResponse<ProductDto> = await axiosPrivateInstance.get(`/api/products/${productId}`);
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const productService = {
  createProduct,
  getAllProducts,
  getProduct
}