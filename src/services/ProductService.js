import { fetchproductAPI,  createProductAPI, deleteProductAPI } from "../api/UserApi";


export async function fetchProducts(page = 1) {
    const result = await fetchproductAPI(page);

     if (!result.success) {
        throw new Error(result.message);
    }
    return result.products;
}

export async function createProduct(productData) {
    try {
        const result = await createProductAPI(productData);

        return result;
    } catch (err) {
    throw new Error(err.message || 'Failed to create product');
  }
}


export async function deleteProduct(id) {
    try {
        const response = await deleteProductAPI(id);
        return response;
    } catch(err) {
        throw new Error(err.message || 'Failed to delete product');
    }
}