const BASE_URL = 'http://localhost:4000/api';

export async function registerUser(data) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    return res.json();
}