// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  photo: {
    type: String, // You can store the URL of the photo
    default: '',
  },
  isPublic: {
    type: Boolean,
    default: true, // By default, the profile is public
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
