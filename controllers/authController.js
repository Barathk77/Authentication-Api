// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

// Register a new user
// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password, isAdmin, name, bio, phone, photo } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password,
      isAdmin: isAdmin || false,
      name,
      bio,
      phone,
      photo,
    });

    // Save the user to the database
    await user.save();

    // Create and return a JWT token
    const payload = { id: user.id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and return a JWT token
    const payload = { id: user.id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.promoteToAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's role to admin
    user.isAdmin = true;
    await user.save();

    res.status(200).json({ message: 'User promoted to admin successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let users;
    if (req.user && req.user.isAdmin) {
      // If the user is an admin, return all users
      users = await User.find().select('-password');
    } else {
      // If the user is not an admin, return only public profiles
      users = await User.find({ isPublic: true }).select('-password');
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
