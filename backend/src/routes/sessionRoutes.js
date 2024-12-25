import express from 'express';
import { getSessions, addSession, updateSession, deleteSession } from '../controllers/sessionController.js';
import verifyDjangoSession from '../middlewares/verifyDjangoSession.js';

const router = express.Router();

router.route('/')
  .get(verifyDjangoSession, getSessions)  // Fetch user sessions
  .post(verifyDjangoSession, addSession); // Add a new session

router.route('/:id')
  .put(verifyDjangoSession, updateSession)    // Update a session
  .delete(verifyDjangoSession, deleteSession); // Delete a session

export default router;
