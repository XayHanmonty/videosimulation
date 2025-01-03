const { exec } = require('child_process');
const TranslationClient = require('../src/clientLibrary'); // Ensure the path to your client library is correct

(async () => {
    console.log('Starting integration test...');

    // Start the server
    const serverProcess = exec('node src/server.js', (error, stdout, stderr) => {
        if (stdout) {
            console.log(`Server STDOUT: ${stdout}`);
        }
        if (stderr) {
            console.error(`Server STDERR: ${stderr}`);
        }
        if (error) {
            console.error(`Server Error: ${error.message}`);
        }
    });

    console.log('Server is starting...');

    // Allow the server to spin up
    setTimeout(() => {
        console.log('Server started. Initializing client...');

        // Initialize the TranslationClient
        const client = new TranslationClient('http://localhost:3000', 5, 1000);

        // Poll the server for status
        client.pollStatus((err, message) => {
            if (err) {
                console.error(`Client Error: ${err}`);
            } else {
                console.log(`Client Success: ${message}`);
            }

            console.log('Stopping server...');
            serverProcess.kill('SIGINT');
        });
    }, 2000); 
})();