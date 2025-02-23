const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

// CRUD operations for likes
router.post('/', likeController.likeTweet);
router.get('/:tweetId', likeController.getLikesByTweet);
router.delete('/:userId/:tweetId', likeController.unlikeTweet);

module.exports = router;
