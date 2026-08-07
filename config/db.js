const mongoose = require("mongoose");

const connectDB = async () => {
    // Prefer local MONGO_URI during development to avoid accidental Atlas auth issues.
    const uri = process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI || process.env.MONGO_URI
        : process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!uri) {
        console.error("❌ Database Connection Error: MongoDB URI is not defined.");
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log("✅ Database Connected");
    } catch (error) {
        console.error("❌ Database Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;