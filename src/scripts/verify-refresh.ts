import fetch from 'node-fetch'; // You might need to install node-fetch if not available globally or use native fetch if node version supports it.
// Assuming Node 18+ has native fetch, but if not, we might need to install it.
// Let's try native fetch first.

const BASE_URL = 'http://localhost:3000/api';

async function verify() {
    const email = `test_refresh_${Date.now()}@example.com`;
    const password = 'password123';
    const cpf = `123456789${Math.floor(Math.random() * 100)}`; // Simple random CPF
    const name = 'Test Refresh User';

    console.log(`1. Registering user: ${email}`);
    const registerRes = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, cpf }),
    });

    if (!registerRes.ok) {
        console.error('Registration failed:', await registerRes.text());
        return;
    }
    console.log('Registration successful');

    console.log('2. Logging in');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
        console.error('Login failed:', await loginRes.text());
        return;
    }

    const loginData = (await loginRes.json()) as any;
    console.log('Login successful');

    if (!loginData.refreshToken) {
        console.error('FAIL: No refreshToken in login response');
        return;
    }
    console.log('PASS: refreshToken present');

    console.log('3. Refreshing token');
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: loginData.refreshToken }),
    });

    if (!refreshRes.ok) {
        console.error('Refresh failed:', await refreshRes.text());
        return;
    }

    const refreshData = (await refreshRes.json()) as any;
    if (!refreshData.token) {
        console.error('FAIL: No token in refresh response');
        return;
    }
    console.log('PASS: Token refreshed successfully');
    console.log('New Token:', refreshData.token.substring(0, 20) + '...');
}

verify().catch(console.error);
