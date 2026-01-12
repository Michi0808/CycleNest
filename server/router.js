import express from 'express';
import sendEvent from './controller/eventController.js';
import { create } from './controller/userController.js';
const router = express.Router();

// Endpoint for the Express Server
router.post('/register', create);

// Endpoint for the Google Calendar API
router.post('/integration/:calendarID', sendEvent);

export default router;
