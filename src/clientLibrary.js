const axios = require('axios');

class TranslationClient {
    /**
     * Initializes the TranslationClient.
     * @param {string} baseURL - The base URL of the server (e.g., http://localhost:3000).
     * @param {number} maxRetries - Maximum number of retries for polling.
     * @param {number} initialInterval - Initial polling interval in milliseconds.
     */
    constructor(baseURL, maxRetries = 5, initialInterval = 1000) {
        this.baseURL = baseURL;
        this.maxRetries = maxRetries;
        this.initialInterval = initialInterval;
    }

    /**
     * Polls the server's status endpoint with exponential backoff.
     * @param {function} callback - Callback function to handle the result (error, success).
     */
    async pollStatus(callback) {
        let retries = 0;
        let interval = this.initialInterval;

        const poll = async () => {
            try {
                console.log(`Polling status... Attempt ${retries + 1}`);
                const response = await axios.get(`${this.baseURL}/status`);
                const result = response.data.result;

                console.log(`Status: ${result}`);

                if (result === 'completed') {
                    callback(null, 'Translation completed!');
                } else if (result === 'error') {
                    callback('Translation failed!');
                } else if (result === 'pending') {
                    if (retries < this.maxRetries) {
                        retries++;
                        setTimeout(poll, interval);
                        interval *= 2; 
                    } else {
                        callback('Max retries exceeded!');
                    }
                }
            } catch (error) {
                callback(`Error: ${error.message}`);
            }
        };

        poll();
    }
}

module.exports = TranslationClient;