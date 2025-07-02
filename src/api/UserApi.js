const BASE_URL = 'http://localhost:4000';

export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
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
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
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
