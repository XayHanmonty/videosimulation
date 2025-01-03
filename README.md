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