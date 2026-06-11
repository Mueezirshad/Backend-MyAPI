require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  const start = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error.message);
      process.exit(1);
    }
  };

  start();
}

module.exports = app;
