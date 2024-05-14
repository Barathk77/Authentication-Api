//profileController.js
const User = require('../models/User');

// Get all public profiles
exports.getPublicProfiles = async (req, res) => {
    try {
        const users = await User.find({ isPublic: true }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile by ID with authorization check
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user.isPublic || (req.user && (req.user.isAdmin || req.user.id === user.id))) {
            res.status(200).json(user);
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAnyUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user
        const { name, bio, phone, photo } = req.body; // Extract updated profile fields from request body

        // Update user profile in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId, // User ID
            { name, bio, phone, photo }, // Updated profile data
            { new: true, runValidators: true } // Return the updated user document and run validators
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser); // Respond with the updated user profile
    } catch (error) {
        res.status(500).json({ message: 'Server error', error }); // Handle errors
    }
};

exports.updateProfilePrivacy = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user
        const { isPublic } = req.body; // Extract isPublic from request body

        // Update the user's profile privacy in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId, // User ID
            { isPublic }, // Updated profile privacy
            { new: true, runValidators: true } // Return the updated user document and run validators
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser); // Respond with the updated user profile
    } catch (error) {
        res.status(500).json({ message: 'Server error', error }); // Handle errors
    }
};