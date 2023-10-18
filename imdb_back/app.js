const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/mainRouter");
const port = process.env.DEV_PORT || 4000;
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_KEY)
  .then((res) => {
    console.log("MONGODB CONNECTED");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`serve at http://localhost:${port}`);
});

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET, POST",
  })
);
app.use("/", mainRouter);
