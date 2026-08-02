require("dotenv").config();
const dashboardRoutes = require("./routes/dashboardRoutes");
const express = require("express");
const cors = require("cors");
const questionRoutes = require("./routes/questionRoutes");

const authRoutes = require("./routes/authRoutes");
const db = require("./config/db");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

const app = express();

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
    } else {
        console.log("Database Connected Successfully");
    }
});

app.use(cors());
app.use(express.json());
app.use("/api/questions", questionRoutes);
app.get("/", (req, res) => {
    res.send("Backend Server Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});