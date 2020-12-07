// Imports
const express = require('express');
const messagesController = require('../controllers/messages');

// Router config
const router = express.Router();

// API endpoints
router.post('/new', messagesController.newMessage);

// Export
module.exports = router;
