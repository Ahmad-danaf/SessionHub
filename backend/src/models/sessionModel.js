import mongoose from 'mongoose';
const sessionSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    sessionType: { type: String, enum: ['log', 'plan'], required: true },
    date: { type: Date, required: true },
    location: { type: String },
    celestialObjects: [String],
    notes: { type: String },
    status: { type: String, enum: ['completed', 'upcoming'], required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Session', sessionSchema);