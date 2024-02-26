const express = require('express');
const router = express.Router();

// Rota para a raiz
router.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Rota para /hello
router.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

// Rota para /user/:name
router.get('/user/:name', (req, res) => {
    const { name } = req.params;
    res.send(`Hello, ${name}!`);
});

// Rota para POST /user
router.post('/user', (req, res) => {
    const { name } = req.body;
    res.send(`Welcome, ${name}!`);
});

module.exports = router;
