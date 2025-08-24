const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');

    // Test health check
    console.log('1. Testing health check...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', health.data);

    // Test root endpoint
    console.log('\n2. Testing root endpoint...');
    const root = await axios.get(`${BASE_URL}/`);
    console.log('✅ Root endpoint:', root.data);

    // Test create user
    console.log('\n3. Testing create user...');
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    };
    const createUser = await axios.post(`${BASE_URL}/api/users`, newUser);
    console.log('✅ User created:', createUser.data);
    const userId = createUser.data.id;

    // Test get all users
    console.log('\n4. Testing get all users...');
    const allUsers = await axios.get(`${BASE_URL}/api/users`);
    console.log('✅ All users:', allUsers.data);

    // Test get user by ID
    console.log('\n5. Testing get user by ID...');
    const userById = await axios.get(`${BASE_URL}/api/users/${userId}`);
    console.log('✅ User by ID:', userById.data);

    // Test update user
    console.log('\n6. Testing update user...');
    const updateData = { name: 'John Smith', age: 31 };
    const updatedUser = await axios.put(`${BASE_URL}/api/users/${userId}`, updateData);
    console.log('✅ User updated:', updatedUser.data);

    // Test filter users
    console.log('\n7. Testing filter users...');
    const filteredUsers = await axios.get(`${BASE_URL}/api/users?name=John`);
    console.log('✅ Filtered users:', filteredUsers.data);

    // Test delete user
    console.log('\n8. Testing delete user...');
    await axios.delete(`${BASE_URL}/api/users/${userId}`);
    console.log('✅ User deleted');

    // Verify user is deleted
    console.log('\n9. Verifying user deletion...');
    try {
      await axios.get(`${BASE_URL}/api/users/${userId}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('✅ User successfully deleted (404 returned)');
      } else {
        throw error;
      }
    }

    console.log('\n🎉 All tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Check if server is running before testing
async function checkServer() {
  try {
    await axios.get(`${BASE_URL}/health`);
    console.log('🚀 Server is running, starting tests...\n');
    await testAPI();
  } catch (error) {
    console.error('❌ Server is not running. Please start the server first:');
    console.error('   npm run dev');
  }
}

checkServer();

