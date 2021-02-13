const express = require('express');
const router = express.Router();
const {authMiddleware,  requireSignin, adminMiddleware} = require('../controllers/auth');
const {read} = require('../controllers/user');

router.get('/profile', requireSignin, authMiddleware, read);

module.exports = router;

