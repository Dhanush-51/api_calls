const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

// CRUD operations for profiles
router.post('/', profileController.createProfile);
router.get('/', profileController.getProfiles);
router.get('/:id', profileController.getProfileById);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

module.exports = router;
