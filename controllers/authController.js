const cloudinary = require('../config/cloudinary'); // Cloudinary config ka path
const fs = require('fs'); // Node.js ka file system module (temp file delete karne ke liye)

// MongoDB ki jagah data is array me save hoga jab tak server chal raha he
const localUsersArray = [];

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    // 1. Check karein kya email pehle se array me he
    const userExists = localUsersArray.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      // Agar file upload hui thi aur user pehle se hai, to temporary file delete karo taake server baje nahi
      if (req.file && req.file.path) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // 2. Cloudinary par image upload karein
    let imageUrl = "";
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'user_profiles'
        });
        imageUrl = result.secure_url; // Cloudinary ka live link

        // Cloudinary par upload hone ke baad local server se temp file delete karein (Vercel/Render ke liye zaroori hai)
        if (req.file.path) {
          fs.unlinkSync(req.file.path);
        }
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        // Agar image upload fail ho jaye to temp file fir bhi delete karein
        if (req.file.path) fs.unlinkSync(req.file.path);
        return res.status(500).json({ success: false, message: "Failed to upload profile picture" });
      }
    }

    // 3. Naya user object banayein aur array me push kar dein
    const newUser = {
      id: Date.now().toString(), // Fake unique ID
      name,
      email: email.toLowerCase(),
      password,
      profilePic: imageUrl // Cloudinary ka link yahan chala gaya
    };

    localUsersArray.push(newUser);

    // 4. Frontend ko response bhejein
    return res.status(201).json({
      success: true,
      message: "User registered successfully without MongoDB!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic
      }
    });

  } catch (error) {
    console.error("Signup Controller Error:", error);
    // Safe check: agar error aaye to temp file ko clean up karein
    if (req.file && req.file.path) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }
    return res.status(500).json({ success: false, message: "Server error during registration" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please enter email and password" });
    }

    // Array me se user dhoondo
    const user = localUsersArray.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic // Header me dikhane ke liye
      }
    });

  } catch (error) {
    console.error("Login Controller Error:", error);
    return res.status(500).json({ success: false, message: "Login error" });
  }
};

module.exports = { registerUser, loginUser };