import express from 'express';
import sendEvent from './controller/eventController.js';
import { create, login } from './controller/userController.js';
import { save } from './controller/cycleController.js';
const router = express.Router();

// Endpoint for the Express Server
router.post('/register', create);
router.post('/login', login);
router.post('/cycle', save);

// Endpoint for the Google Calendar API
router.post('/integration/:calendarID', sendEvent);

export default router;
