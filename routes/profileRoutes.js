// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/public', profileController.getPublicProfiles);
router.get('/:id', auth, profileController.getUserProfile);
router.put('/', auth, profileController.updateUserProfile);
router.put('/privacy', auth, profileController.updateProfilePrivacy);
router.get('/admin/:id', auth, admin, profileController.getAnyUserProfile);

module.exports = router;
