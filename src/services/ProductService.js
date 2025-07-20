import { fetchproductAPI,  createProductAPI, deleteProductAPI, updateProductAPI } from "../api/UserApi";
import { RatingAPI, toggleFavoriteAPI, paymentAPI } from '../api/ProductAPI'


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

export async function updateProduct(id, productData) {
    try {
        const result = await updateProductAPI(id, productData);
        return result;
    } catch(err) {
        throw new Error(err.message || 'Failed to edit the product')
    }
}

export async function rateProduct(productId, rating) {
  try {
    const response = await RatingAPI(productId, rating);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    throw new Error(error.message || 'Failed to submit rating');
  }
}


export async function toggleFavorite(productId) {
  try {
    const result = await toggleFavoriteAPI(productId);

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    throw new Error(error.message || 'Failed to update favorite');
  }
}

export async function createPayment(paymentData) {
  try {
    const response = await paymentAPI(paymentData);
    return response;
  } catch (error) {
    throw new Error(error.message || 'Payment failed');
  }
}