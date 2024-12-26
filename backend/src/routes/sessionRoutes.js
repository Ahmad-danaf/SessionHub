import express from 'express';
import { getSessions, addSession, updateSession, deleteSession,getSessionById } from '../controllers/sessionController.js';
import validateApiKey from '../middlewares/validateApiKey.js';

const router = express.Router();

router.route('/')
  .get(validateApiKey, getSessions)  // Fetch user sessions
  .post(validateApiKey, addSession); // Add a new session

router.route('/:id')
  .get(validateApiKey, getSessionById)   // Fetch a specific session by ID
  .put(validateApiKey, updateSession)    // Update a session
  .delete(validateApiKey, deleteSession); // Delete a session
  

export default router;
