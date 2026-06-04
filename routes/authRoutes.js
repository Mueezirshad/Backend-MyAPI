const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const upload = require('../middlewares/multer'); // Multer ka path

// Register route par upload.single middleware lagaya
// 'profilePic' woh key hai jo frontend ya postman se aayegi
router.post('/register', upload.single('profilePic'), registerUser);

router.post('/login', loginUser);

module.exports = router;