const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const route = require("./routes/route");
// const userRoute = require("./routes/user");

//Add cors support so that we could call our REST API from our frontend application.
app.use(cors());

// app.use("/images",express.static(path.join(__dirname,"/images")));

//load the .env file
dotenv.config();
//parse the json request and put it in the req.body
app.use(express.json());

//connect to our mongodb atlas database
mongoose
  .connect(process.env.MONGO_DB_URL)

//load our rest api routes
app.use("/api",route);

app.listen("5001", () => {
  console.log("RFID backend API server is running.");
});