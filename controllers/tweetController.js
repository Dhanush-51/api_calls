const pool = require('../models/db');

// Create a tweet
exports.createTweet = async (req, res) => {
  const { userId, text, hashtags, imagePath } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO "Tweet" (userId, text, hashtags, imagePath) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, text, hashtags, imagePath]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tweets by user ID
exports.getTweets = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM "Tweet" WHERE userId = $1', [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a tweet
exports.updateTweet = async (req, res) => {
  const { tweetId } = req.params;
  const { text, hashtags, imagePath } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "Tweet" SET text = $1, hashtags = $2, imagePath = $3 WHERE id = $4 RETURNING *',
      [text, hashtags, imagePath, tweetId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a tweet
exports.deleteTweet = async (req, res) => {
  const { tweetId } = req.params;

  try {
    const result = await pool.query('DELETE FROM "Tweet" WHERE id = $1 RETURNING *', [tweetId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    res.status(200).json({ message: 'Tweet deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
