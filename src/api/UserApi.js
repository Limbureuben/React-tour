// const BASE_URL = 'http://localhost:4000';

const BASE_URL = 'http://localhost:8000';

export async function registerUser(data) {
  // const res = await fetch(`${BASE_URL}/api/auth/register`, {
  const res = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (!res.ok) {
    return { success: false, ...result };
  }
  return { success: true, ...result };
}


export async function loginUser(data) {
  // const res = await fetch(`${BASE_URL}/api/auth/login`, {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const json = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: json.message || 'Login failed'
    };
  }

  return {
    success: true,
    user: json.user,
    token: json.token
  };
}

export async function fetchUsersAPI(page = 1) {
  const res = await fetch(`${BASE_URL}/api/users?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    return {
      success: false,
      message: json.message || 'Failed to fetch users',
    };
  }

  return {
    success: true,
    Users: json.Users,
  };
}



export async function deleteUserAPI(userId) {
  const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to delete user');
  }

  return json;
}


export async function createUserAPI(data) {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || 'Failed to create user');
  }

  return json.user || json;
}



export async function fetchproductAPI(page = 1) {
  const res = await fetch(`${BASE_URL}/api/products?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    return {
      success: false,
      message: json.message || 'Failed to fetch users',
    };
  }

  return {
    success: true,
    Users: json.Users,
  };
}