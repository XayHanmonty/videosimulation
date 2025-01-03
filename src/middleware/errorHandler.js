const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ error: 'An unexpected error occurred.' });
};

module.exports = { errorHandler };