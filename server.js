const express = require('express');
const app = express();

// Sample GET API
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});