import Session from '../models/sessionModel.js';

// Fetch user sessions
export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user }); // Fetch by userId
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new session
export const addSession = async (req, res) => {
  try {
    const { sessionType, date, location, celestialObjects, notes, status } = req.body;
    const newSession = new Session({
      userId: req.user,
      sessionType,
      date,
      location,
      celestialObjects,
      notes,
      status,
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
    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSession);
  } catch (error) {
    console.error('Error updating session:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a session
export const deleteSession = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Error deleting session:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
