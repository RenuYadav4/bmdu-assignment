import axiosInstance from "../utils/axiosInstance";

import { API_PATHS } from "../utils/apiPath";

export const getProduct = async()=>{
    return await axiosInstance.get(API_PATHS.PRODUCT.GET_ALL);
}

export const getProductById = async (id) => {
    return await axiosInstance.API_PATHS.PRODUCT.GET_BY_ID(id);
}


export const addProduct = async (productData)=>{
    return await axiosInstance.post(API_PATHS.PRODUCT.CREATE,productData);
}

export const deleteProduct = async(id)=>{
    return await axiosInstance.delete(API_PATHS.PRODUCT.DELETE(id))

}

export const updateProduct = async(id,productData)=>{
        return await axiosInstance.put(API_PATHS.PRODUCT.UPDATE(id),productData);
}