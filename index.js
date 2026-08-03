require("dotenv").config();

const path = require("path");
const dashboardRoutes = require("./routes/dashboardRoutes");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes"); 
const libraryRecordRoutes = require("./routes/libraryRecordRoutes");

console.log(`PORT=${PORT}; MONGODB_URI set=${!!process.env.MONGODB_URI}; MONGO_URI set=${!!process.env.MONGO_URI}`);

app.use(express.json());
app.use(cors());
app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/library-records", libraryRecordRoutes);
app.use("/api/library", libraryRecordRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
};

// Start the server
startServer();