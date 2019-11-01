const express = require('express');
const router = express.Router();

// GET api users, Test route, public access //
router.get('/', (req, res) => res.send('Post route'));


module.exports = router;