require("dotenv").config();

const dashboardRoutes = require("./routes/dashboardRoutes");
const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes"); 
const libraryRecordRoutes = require("./routes/libraryRecordRoutes");

connectDB();
app.use(express.json());
app.use("/books", bookRoutes);
app.use("/categories", categoryRoutes);
app.use("/library-records", libraryRecordRoutes);
app.use("/users", userRoutes);
app.use("/library", libraryRecordRoutes);
app.use("/dashboard", dashboardRoutes);



//starting the server (listen after routes)
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});