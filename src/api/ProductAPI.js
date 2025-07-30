const BASE_URL = 'http://localhost:8000';
const URL = 'https://99d96fe7aa16.ngrok-free.app';


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

export async function RatingAPI(productId, rating){
  const res = await fetch(`${BASE_URL}/api/rating`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // your token key
    },
    body: JSON.stringify({
      product_id: productId,
      rating,
    }),
  });

  const json = await res.json();

  if (!res.ok || json.success === false) {
    return {
      success: false,
      message: json.message || 'Failed to submit rating',
    };
  }

  return {
    success: true,
    message: json.message || 'Rating submitted successfully',
  };
}


export async function toggleFavoriteAPI(productId) {
  const res = await fetch(`${BASE_URL}/api/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: JSON.stringify({ product_id: productId }),
  });

  const json = await res.json();

  if (!res.ok || json.success === false) {
    return {
      success: false,
      message: json.message || 'Failed to update favorite',
    };
  }

  return {
    success: true,
    message: json.message || 'Favorite updated successfully',
  };
}



export async function paymentAPI(paymentData) {
  const res = await fetch(`${URL}/api/submit-payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(paymentData),
  });

  const json = await res.json();

  if(!res.ok || json.success === false) {
    return {
      success: false,
      message: json.message || 'Payment failed'
    }
  }

  return {
    success: true,
    message: json.message || 'Payment processed successfully',
    transactionId: json.transactionId
  }
}



export async function initiatePaymentAPI(phone, amount) {
  const res = await fetch(`${BASE_URL}/api/pesapal/initiate/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone, amount }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Payment failed');
  }
  return data;
}
