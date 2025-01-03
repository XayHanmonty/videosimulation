Here’s the README.md in full Markdown:

# Heygen Video Translation Simulation

This project simulates a video translation backend and provides a client library to interact with it. The server simulates translation status updates (`pending`, `completed`, or `error`), while the client library intelligently polls the server using exponential backoff.

---

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Configuration](#configuration)
6. [Scripts](#scripts)
7. [Future Enhancements](#future-enhancements)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

---

## Features

### Server
- Simulates a `/status` endpoint to provide translation job updates.
- Configurable delay and error probability via environment variables.
- Gracefully shuts down when stopped.

### Client Library
- Polls the server for translation status using exponential backoff.
- Handles API errors and status updates.
- Configurable polling interval and maximum retries.

### Integration Test
- Automatically starts the server, runs the client library, and stops the server after completion.
- Demonstrates how the server and client work together.

---

## Project Structure

```plaintext
heygen-assignment/
├── src/
│   ├── middleware/         # Middleware for logging and error handling
│   ├── routes/             # Routes for server endpoints
│   ├── clientLibrary.js    # Client library for polling
│   ├── config.js           # Configuration values (delay, error probability)
│   └── server.js           # Main server file
├── tests/
│   ├── integrationTest.js  # Integration test for server and client
│   └── runClient.js        # Example usage of the client library
├── .env                    # Environment variables
├── nodemon.json            # nodemon configuration
├── package.json            # Dependencies and scripts
├── README.md               # Project documentation
└── .gitignore              # Ignored files and folders

Installation
	1.	Clone the repository:

git clone https://github.com/XayHanmonty/heygenassignment.git
cd heygenassignment


	2.	Install dependencies:

npm install


	3.	Configure the server behavior using a .env file in the root directory:

TRANSLATION_DELAY=10000   # Delay before the status changes to 'completed' (in ms)
ERROR_PROBABILITY=0.1     # Probability of returning 'error' (0.1 = 10%)

Usage

Start the Server

Run the server manually:

npm start

The server will be available at http://localhost:3000.

Test the /status Endpoint

Use curl or any HTTP client to test the /status endpoint:

curl http://localhost:3000/status

Possible responses:
	•	{ "result": "pending" }
	•	{ "result": "completed" }
	•	{ "result": "error" }

Run the Client Library

Use the client library to poll the server for status updates. Example script (tests/runClient.js):

const TranslationClient = require('../src/clientLibrary');

const client = new TranslationClient('http://localhost:3000', 5, 1000);

client.pollStatus((err, message) => {
    if (err) {
        console.error(`Error: ${err}`);
    } else {
        console.log(`Success: ${message}`);
    }
});

Run the script:

node tests/runClient.js

Run the Integration Test

The integration test demonstrates how the server and client work together:

npm run run-test

Expected Output:

Starting integration test...
Server is starting...
Server started. Initializing client...
Polling status... Attempt 1
Status: pending
Polling status... Attempt 2
Status: pending
Polling status... Attempt 3
Status: completed
Client Success: Translation completed!
Stopping server...
Shutting down server...
Server shut down gracefully.

Configuration

Environment Variables

Variable	Default Value	Description
TRANSLATION_DELAY	10000	Time in milliseconds before status changes.
ERROR_PROBABILITY	0.1	Probability of returning an error result.

Scripts

Command	Description
npm start	Starts the server.
npm run dev	Starts the server in development mode.
npm run run-test	Runs the integration test.

Future Enhancements
	1.	Docker Support:
	•	Containerize the server and client for deployment.
	2.	More APIs:
	•	Add job IDs to simulate multiple concurrent translations.
	3.	Advanced Logging:
	•	Add timestamps and log levels (info, error, debug).
	4.	Automated Testing:
	•	Integrate with Jest or Mocha for additional test cases.

Contributing
	1.	Fork the repository.
	2.	Create a feature branch:

git checkout -b feature-name


	3.	Commit your changes:

git commit -m "Add feature"


	4.	Push the branch:

git push origin feature-name


	5.	Open a pull request.

License

This project is licensed under the ISC License.

Contact

For issues, please visit the GitHub Issues page.

This is fully Markdown-formatted and ready to be used as a `README.md` file. Let me know if you’d like further adjustments! 😊