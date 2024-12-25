import axios from 'axios';

const verifyDjangoSession = async (req, res, next) => {
  try {
    // Extract cookies from the request
    const sessionId = req.cookies.sessionid;
    const csrfToken = req.headers['x-csrftoken'];

    // Check if cookies are present
    if (!sessionId || !csrfToken) {
      return res.status(401).json({ error: 'Unauthorized: Missing session or CSRF token' });
    }

    // Validate session with SpaceCodey
    const response = await axios.post(
      `${process.env.SPACE_CODEY_BASE_URL}/api/check-auth/`, // SpaceCodey endpoint
      {}, // No body is needed
      {
        headers: {
          Cookie: `sessionid=${sessionId}`,
          'X-CSRFToken': csrfToken,
        },
      }
    );

    if (response.data.authenticated) {
      req.user = response.data.userId; // Attach user ID to the request object
      return next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(401).json({ error: 'Unauthorized: Invalid session' });
    }
  } catch (error) {
    console.error('Error verifying session:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default verifyDjangoSession;
