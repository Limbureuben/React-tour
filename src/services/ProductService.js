import { fetchproductAPI } from "../api/UserApi";


export async function fetchProduct(page = 1) {
    const result = await fetchproductAPI(page);

     if (!result.success) {
        throw new Error(result.message);
    }
    return result.products;
}