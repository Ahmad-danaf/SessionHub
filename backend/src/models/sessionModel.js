import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // From SpaceCodey
  sessionType: { type: String, enum: ['log', 'plan'], required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  celestialObjects: { type: [String], default: [] },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['completed', 'upcoming'], required: true },
});

const Session = mongoose.model('Session', sessionSchema, 'sessions'); // Model, Schema, Collection

export default Session;
