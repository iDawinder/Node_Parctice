const mongoose = require("mongoose");
require("dotenv").config();


//define the MongoDB connection url
//replace the end word accorfing to your database name
//here hotel is the database name
// const mongoURL = "mongodb://localhost:27017/hotels";
const mongoURL = process.env.MONGODB_URL
// const mongoURL_LOCAL = process.env.MONGODB_URL_LOCAL

// set up the connection to MongoDB

// const mongoose = require('mongoose');

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// mongoose maintain a default connection object representing the MongoDB connection
const db = mongoose.connection;

// check if the connection is successful or not
db.on("connected", () => {
  console.log("MongoDB connected successfully");
});
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// this is the event handler for when the connection is open

module.exports = db;
// this will be used in other files to access the database connection
