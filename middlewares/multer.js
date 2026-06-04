const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 1. Temporary uploads folder ka path (Vercel ya Local ke liye)
const uploadDir = path.join(__dirname, '../uploads');

// Agar folder nahi bana hua, toh automatic bana do
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Ab file sahi jagah save hogi
  },
  filename: function (req, file, cb) {
    // Unique filename taake same naam ki files aapas mein takrayen nahi
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// 3. Middleware Initialization
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Safe side: Max 5MB file limit
});

module.exports = upload;