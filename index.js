// export or require
const express = require("express");
const cors = require("cors");

// create app
const app = express();

// create port
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// get app
app.get("/", (req, res) => {
  res.send("Toy-Galaxy Server is Running");
});

// listen to the Port
app.listen(port, () => {
  console.log(`Toy-Galaxy Server running on port: ${port}`);
});
