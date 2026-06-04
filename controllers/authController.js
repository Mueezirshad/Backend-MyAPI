const cloudinary = require('../config/cloudinary'); // Cloudinary config ka path
const fs = require('fs'); 

const localUsersArray = [];

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        const userExists = localUsersArray.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (userExists) {
            if (req.file && req.file.path) fs.unlinkSync(req.file.path);
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        let imageUrl = "";
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'user_profiles'
                });
                imageUrl = result.secure_url;

                if (req.file.path) {
                    fs.unlinkSync(req.file.path);
                }
            } catch (uploadError) {
                console.error("Cloudinary Upload Error:", uploadError);
                if (req.file.path) fs.unlinkSync(req.file.path);
                return res.status(500).json({ success: false, message: "Failed to upload profile picture" });
            }
        }

        const newUser = {
            id: Date.now().toString(), // Fake unique ID
            name,
            email: email.toLowerCase(),
            password,
            profilePic: imageUrl // Cloudinary ka link yahan chala gaya
        };

        localUsersArray.push(newUser);
        
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
        if (req.file && req.file.path) {
            try { fs.unlinkSync(req.file.path); } catch (e) { }
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

        console.log("\n🔑 ====== LOGIN ATTEMPT ====== 🔑");
        console.log(`Email: ${email} | Password: ${password}`);
        console.log("Current Users in Array Before Search:", localUsersArray);

        const user = localUsersArray.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        
        if (!user) {
            console.log("❌ LOGIN FAILED: User nahi mila ya credentials galat hain!");
            console.log("=============================================\n");
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        console.log("✅ LOGIN SUCCESSFUL FOR:", user.name);
        console.log("=============================================\n");

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