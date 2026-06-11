const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { uploadToCloudinary } = require("../config/cloudinary");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "VanishMart_secret_key", {
    expiresIn: "30d",
  });
};

//REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // agrr user pehly se majood hai
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    let profilePicUrl = "";
    if (req.file) {
      profilePicUrl = await uploadToCloudinary(req.file.buffer, "VanishMart_users");
    }

    const user = await User.create({
      name,
      email,
      password,
      profilePic: profilePicUrl,
    });

    res.status(201).json({
      message: "Registration successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Registration Server Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

//  LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong email & password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong email & password" });
    }

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};