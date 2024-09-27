// backend/index.js
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index"); // Make sure you have this file with your routes

const app = express();

app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the main router
app.use("/api/v1", rootRouter);

// Start the server on port 5000 (change this if needed)
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
