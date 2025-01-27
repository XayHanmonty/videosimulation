    const express = require('express');
const routes = require('./routes');
const { logRequests } = require('./middleware/logRequests');
const { errorHandler } = require('./middleware/errorHandler');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Store progress for each session
let currentProgress = 0;
let isCompleted = false;

// Function to simulate video processing
function simulateVideoProcessing() {
    if (currentProgress < 100 && !isCompleted) {
        // Add a small random increment (0.5 to 2)
        const increment = Math.random() * 1.5 + 0.5;
        currentProgress = Math.min(99.9, currentProgress + increment);
    }
    setTimeout(simulateVideoProcessing, 1000);
}

// Start the simulation
simulateVideoProcessing();

app.use(cors());
app.use(logRequests);
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); 

app.use('/api', routes);

// Reset progress endpoint
app.post('/reset', (req, res) => {
    currentProgress = 0;
    isCompleted = false;
    res.json({ status: 'reset', progress: currentProgress });
});

app.get('/status', (req, res) => {
    // Randomly complete the process when progress is high
    if (currentProgress > 95 && Math.random() < 0.1) {
        currentProgress = 100;
        isCompleted = true;
    }

    res.json({ 
        status: currentProgress >= 100 ? 'complete' : 'processing',
        progress: Math.floor(currentProgress * 10) / 10  // Round to 1 decimal place
    });
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server shut down gracefully.');
        process.exit(0);
    });
});