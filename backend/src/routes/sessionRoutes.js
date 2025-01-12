import express from 'express';
import {
  getSessions,
  addSession,
  updateSession,
  deleteSession,
  getSessionById,
  updateTripChecklist,
  addGoal,
  getChecklists,
  markAllAsCompleted,
} from '../controllers/sessionController.js';
import validateApiKey from '../middlewares/validateApiKey.js';

const router = express.Router();

// General session routes
router.route('/')
  .get(validateApiKey, getSessions)  // Fetch user sessions
  .post(validateApiKey, addSession); // Add a new session

router.route('/:id')
  .get(validateApiKey, getSessionById)   // Fetch a specific session by ID
  .put(validateApiKey, updateSession)    // Update a session
  .delete(validateApiKey, deleteSession); // Delete a session

// Specific checklist routes
router.route('/:id/trip-checklist')
  .put(validateApiKey, updateTripChecklist); // Update trip checklist item

router.route('/:id/goals-checklist')
  .post(validateApiKey, addGoal); // Add a new goal to the goals checklist

router.route('/:id/checklists')
  .get(validateApiKey, getChecklists); // Fetch trip and goals checklists

router.route('/:id/mark-all-completed')
  .put(validateApiKey, markAllAsCompleted); // Mark all items or goals as completed

export default router;
