const mongoose = require("mongoose");

const connectDB = async () => {
    // Prefer MONGODB_URI first, then fall back to MONGO_URI.
    // This avoids unintentionally using a bad local/old URI when both vars are set.
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    const source = process.env.MONGODB_URI ? 'MONGODB_URI' : 'MONGO_URI';

    if (!uri) {
        console.error("❌ Database Connection Error: MongoDB URI is not defined.");
        process.exit(1);
    }

    console.log(`Using MongoDB connection string from ${source}`);

    try {
        await mongoose.connect(uri);
        console.log("✅ Database Connected");
    } catch (error) {
        console.error("❌ Database Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;