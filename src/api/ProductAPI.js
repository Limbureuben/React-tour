const BASE_URL = 'http://localhost:8000';

export async function userProductAPI() {
    const res = await fetch(`${BASE_URL}/api/user-product`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
    });

    const json = await res.json();

    if (!res.ok || json.success === false) {
        return {
        success: false,
        message: json.message || 'Failed to fetch products',
        };
    }

  return {
    success: true,
    products: json.products,
    total: json.total,
  };
}