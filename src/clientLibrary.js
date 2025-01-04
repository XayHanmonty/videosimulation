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
     * Logs a message with a timestamp and context.
     * @param {string} level - The log level (e.g., INFO, ERROR).
     * @param {string} message - The log message.
     */
    log(level, message) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${level}] ${message}`);
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
                this.log('INFO', `Polling status... Attempt ${retries + 1}`);
                const response = await axios.get(`${this.baseURL}/status`);
                const result = response.data.result;

                this.log('INFO', `Received status: ${result}`);

                if (result === 'completed') {
                    this.log('SUCCESS', 'Translation completed successfully.');
                    callback(null, 'Translation completed!');
                } else if (result === 'error') {
                    this.log('ERROR', 'Translation failed.');
                    callback('Translation failed!');
                } else if (result === 'pending') {
                    if (retries < this.maxRetries) {
                        retries++;
                        this.log('INFO', `Retrying in ${interval}ms...`);
                        setTimeout(poll, interval);
                        interval *= 2; // Exponential backoff
                    } else {
                        this.log('ERROR', 'Max retries exceeded. Translation is still pending.');
                        callback('Max retries exceeded!');
                    }
                }
            } catch (error) {
                this.log('ERROR', `Polling failed with error: ${error.message}`);
                callback(`Error: ${error.message}`);
            }
        };

        poll();
    }
}

module.exports = TranslationClient;