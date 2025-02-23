const pool = require('../models/db');

// Like a tweet
exports.likeTweet = async (req, res) => {
  const { userId, tweetId } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO "Like" (userId, tweetId) VALUES ($1, $2) RETURNING *',
      [userId, tweetId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all likes for a tweet
exports.getLikesByTweet = async (req, res) => {
  const { tweetId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM "Like" WHERE tweetId = $1', [tweetId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove a like from a tweet
exports.unlikeTweet = async (req, res) => {
  const { userId, tweetId } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM "Like" WHERE userId = $1 AND tweetId = $2 RETURNING *',
      [userId, tweetId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Like not found' });
    }
    res.status(200).json({ message: 'Like removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
