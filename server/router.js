import express from 'express';
import sendEvent from './controller/eventController.js';
const router = express.Router();

router.post('/integration/:calendarID', sendEvent);

export default router;
