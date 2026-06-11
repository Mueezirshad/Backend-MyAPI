const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ek email se ek hi account banega
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String, // Cloudinary ka image URL yahan save hoga
      default: "",
    },
  },
  {
    timestamps: true, // Is se signup ki date aur time khud save ho jayega
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); 
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // parameters mein 'next' pass karne se yeh crash nahi hoga
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;