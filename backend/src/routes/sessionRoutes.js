import express from 'express';
import { getSessions, addSession, updateSession, deleteSession } from '../controllers/sessionController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes
router.route('/')
  .get(protect, getSessions)  // Get all sessions for a user
  .post(protect, addSession); // Add a new session

router.route('/:id')
  .put(protect, updateSession)   // Update an existing session
  .delete(protect, deleteSession); // Delete a session by ID

export default router;
