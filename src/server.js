const express = require('express');
const routes = require('./routes');
const { logRequests } = require('./middleware/logRequests');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logRequests);
app.use(express.json()); 

app.use('/', routes);

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