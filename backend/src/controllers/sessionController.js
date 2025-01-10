import Session from '../models/sessionModel.js';

// Fetch all user sessions
export const getSessions = async (req, res) => {
  try {
    const { userId } = req.body; // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const sessions = await Session.find({ userId }); // Fetch sessions by userId
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fetch a specific session by ID
export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params; // Extract session ID from request parameters

    const session = await Session.findById(id); // Find session by ID

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json(session); // Return the session data as JSON
  } catch (error) {
    console.error('Error fetching session by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new session
export const addSession = async (req, res) => {
  try {
    const {
      userId,
      sessionType,
      date,
      location,
      celestialObjects,
      notes,
      status,
      tripChecklist,
      goalsChecklist,
    } = req.body;

    // Validate required fields
    if (!userId || !sessionType || !date || !location || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newSession = new Session({
      userId,
      sessionType,
      date,
      location,
      celestialObjects: celestialObjects || [],
      notes: notes || '',
      status,
      tripChecklist: tripChecklist || [],
      goalsChecklist: goalsChecklist || [],
    });

    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    console.error('Error adding session:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a session
export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, ...updateData } = req.body;

    // Validate session ID
    if (!id) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    // Ensure the userId matches the session's userId
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.userId != userId) {
      return res.status(403).json({ error: 'Unauthorized: You cannot update this session' });
    }

    // Update checklist items individually
    if (updateData.tripChecklist) {
      session.tripChecklist = updateData.tripChecklist;
    }
    if (updateData.goalsChecklist) {
      session.goalsChecklist = updateData.goalsChecklist;
    }

    // Update other fields
    Object.assign(session, updateData);

    const updatedSession = await session.save();
    res.json(updatedSession);
  } catch (error) {
    console.error('Error updating session:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a session
export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    // Validate session ID
    if (!id) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = await Session.findById(id);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Ensure the userId matches the session's userId
    if (session.userId != userId) {
      return res.status(403).json({ error: 'Unauthorized: You cannot delete this session' });
    }

    await Session.findByIdAndDelete(id);
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Error deleting session:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
