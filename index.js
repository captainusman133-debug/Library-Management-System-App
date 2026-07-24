require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use("/books", bookRoutes);

//starting the server (listen after routes)
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

