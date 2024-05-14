// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Define the registration route
router.post('/register', authController.register);

// Define the login route
router.post('/login', authController.login);

// Define the route to promote a user to admin (admin-only)
router.post('/promote-to-admin', auth, admin, authController.promoteToAdmin);

// Define the route to get the list of users (admin-only)
router.get('/users', auth, authController.getAllUsers);

// Define the route to update the user profile
router.put('/profile', auth, profileController.updateUserProfile);

// Define the route to update profile visibility (privacy)
router.put('/profile/privacy', auth, profileController.updateProfilePrivacy);

module.exports = router;
