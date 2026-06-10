const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const upload = require('../middleware/multer'); // Multer ka path

router.post('/register', upload.single('profilePic'), registerUser);

router.post('/login', loginUser);

module.exports = router;


