import mongoose from 'mongoose';

// Schema definition
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true, // Index for faster queries
    },
    sessionType: {
      type: String,
      enum: ['log', 'plan'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    celestialObjects: {
      type: [String], // Array of strings to list objects (e.g., "Orion Nebula", "Mars")
      default: [],
    },
    status: {
      type: String,
      enum: ['upcoming', 'completed'],
      default: 'upcoming',
    },
    tripChecklist: {
      type: [
        {
          item: { type: String, required: true }, // Name of the item
          completed: { type: Boolean, default: false }, // Whether the item is packed
        },
      ],
      default: [], // Example: [{ item: 'Telescope', completed: false }]
    },
    goalsChecklist: {
      type: [
        {
          goal: { type: String, required: true }, // Description of the goal
          achieved: { type: Boolean, default: false }, // Whether the goal is achieved
        },
      ],
      default: [], // Example: [{ goal: 'Capture Orion Nebula', achieved: false }]
    },
    notes: {
      type: String,
      default: '',
    },
    weatherConditions: {
      type: String, // Optional field for weather data
      default: '',
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);


const Session = mongoose.model('Session', sessionSchema, 'sessions'); // Model, Schema, Collection

export default Session;
