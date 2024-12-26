import dotenv from 'dotenv';

dotenv.config();

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers.authorization?.split(' ')[1];
  if (!apiKey || apiKey !== process.env.SESSIONHUB_API_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
  }
  next();
};

export default validateApiKey;
