const fetch = require('node-fetch'); // Or use built-in fetch if Node 18+

const BASE_URL = 'http://localhost:3000/api';
let token = '';
let userId = '';

async function testBackend() {
    console.log('🚀 Starting Backend Health Check...\n');

    // 1. Test Root
    try {
        const res = await fetch('http://localhost:3000/');
        const data = await res.json();
        console.log('✅ Server Root:', data.message);
    } catch (e) {
        console.error('❌ Server Root Failed:', e.message);
        return;
    }

    // 2. Test Signup
    const uniqueUser = `testuser_${Date.now()}`;
    const userPayload = {
        name: 'Test Traveler',
        email: `${uniqueUser}@example.com`,
        password: 'password123'
    };

    try {
        console.log(`\nTesting Signup for ${userPayload.email}...`);
        const res = await fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userPayload)
        });

        if (res.status === 201) {
            const data = await res.json();
            console.log('✅ Signup Successful');
        } else {
            const err = await res.text();
            console.error('❌ Signup Failed:', res.status, err);
        }
    } catch (e) {
        console.error('❌ Signup Network Error:', e.message);
    }

    // 3. Test Login
    try {
        console.log(`\nTesting Login...`);
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userPayload.email, password: userPayload.password })
        });

        if (res.status === 200) {
            const data = await res.json();
            token = data.token;
            console.log('✅ Login Successful. Token received.');
        } else {
            const err = await res.text();
            console.error('❌ Login Failed:', res.status, err);
            return;
        }
    } catch (e) {
        console.error('❌ Login Network Error:', e.message);
        return;
    }

    // 4. Test Create Trip
    if (token) {
        try {
            console.log(`\nTesting Create Trip...`);
            const tripPayload = {
                title: 'Test Trip to Mars',
                description: 'Exploring the Red Planet',
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
                budget: 10000
            };

            const res = await fetch(`${BASE_URL}/trips`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(tripPayload)
            });

            if (res.status === 201) {
                const data = await res.json();
                console.log('✅ Create Trip Successful:', data.title);
            } else {
                const err = await res.text();
                console.error('❌ Create Trip Failed:', res.status, err);
            }
        } catch (e) {
            console.error('❌ Create Trip Network Error:', e.message);
        }
    }
}

// Check for node-fetch, otherwise verify node version
try {
    require('node-fetch');
    testBackend();
} catch (e) {
    if (parseInt(process.versions.node.split('.')[0]) >= 18) {
        testBackend();
    } else {
        console.error('Please install node-fetch or use Node 18+');
    }
}
