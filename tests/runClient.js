const axios = require('axios');

async function testStatusPolling() {
    try {
        console.log('Testing status endpoint...');
        const response = await axios.get('http://localhost:3000/status');
        console.log(`Server response: ${JSON.stringify(response.data)}`);
    } catch (error) {
        console.error(`Error accessing server: ${error.message}`);
    }
}

testStatusPolling();