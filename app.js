// Import modules here
const express = require("express");
const db = require("./config/database");
const tutorialRoutes = require("./routes/tutorials");
const commentRoutes = require("./routes/comments");

// Test DB
db.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.log(`Error: ${err}`));

// Initialize here
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => res.send("Mic check"));
// Routes here
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/comments", commentRoutes);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));