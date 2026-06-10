const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // .env file se MONGODB_URI ka link utha kar connect karega
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host} 🎉`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1); // Agar DB connect na ho to app ko band kar do
  }
};

module.exports = connectDB;