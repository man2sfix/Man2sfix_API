const express = require('express');

const router = express.Router();
const Controller = require('./auth.controller');

// member login
router.post('/', Controller.memberLogin);

module.exports = router;
