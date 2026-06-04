// config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Taake .env files read ho sakein

// Cloudinary ko configure kar rahe hain
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;