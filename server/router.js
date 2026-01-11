import express from 'express';
import sendEvent from './controller/eventController.js';
import { create } from './controller/userController.js';
const router = express.Router();

router.post('/register', create);
router.post('/integration/:calendarID', sendEvent);

export default router;
