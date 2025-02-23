const express = require('express');
const dotenv = require('dotenv');
const createTables = require('./initDb');  // Import the createTables function from initDb.js

// Import Routes
const profileRoutes = require('./routes/profileRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const replyRoutes = require('./routes/replyRoutes');
const likeRoutes = require('./routes/likeRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');

// Load environment variables
dotenv.config();

// Initialize the database schema (Ensure tables exist before starting the server)
createTables().then(() => {
  const app = express();

  // Middleware
  app.use(express.json());

  // Routes
  app.use('/profiles', profileRoutes);
  app.use('/tweets', tweetRoutes);
  app.use('/replies', replyRoutes);
  app.use('/likes', likeRoutes);
  app.use('/bookmarks', bookmarkRoutes);

  // Default route
  app.get('/', (req, res) => {
    res.send('Twitter Clone API');
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Error initializing database:', err);
});
