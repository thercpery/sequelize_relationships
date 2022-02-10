// Import modules here
const express = require("express");
const cors = require("cors");
const db = require("./models");

const tutorialRoutes = require("./routes/tutorials");
const commentRoutes = require("./routes/comments");

// Initialize here
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.sequelize.sync().then(() => console.log("DB connected."));

// db.sequelize.sync({ force: true }).then(() => console.log("Drop and re-sync db."));

app.get("/", (req, res) => res.send("Mic check"));
// Routes here
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/comments", commentRoutes);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));