const express = require('express');
const dotenv = require('dotenv');
const setupSchema = require('./models/setupSchema');  // Import the setupSchema function from setupSchema.js

// Import Routes
const profileRoutes = require('./routes/profileRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const replyRoutes = require('./routes/replyRoutes');
const likeRoutes = require('./routes/likeRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const followRoutes = require('./routes/followRoutes'); 

// Load environment variables
dotenv.config();

// Initialize the database schema (Ensure tables exist before starting the server)
setupSchema().then(() => {
  const app = express();

  // Middleware
  app.use(express.json());

  // Routes
  app.use('/profiles', profileRoutes);
  app.use('/tweets', tweetRoutes);
  app.use('/replies', replyRoutes);
  app.use('/likes', likeRoutes);
  app.use('/bookmarks', bookmarkRoutes);
  app.use('/follows', followRoutes);


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
