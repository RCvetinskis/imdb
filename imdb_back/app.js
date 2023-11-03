const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const mainRouter = require("./routes/mainRouter");
const port = process.env.DEV_PORT || 4000;
require("dotenv").config();
require("./module/socket")(http);

mongoose
  .connect(process.env.MONGO_KEY)
  .then((res) => {
    console.log("MONGODB CONNECTED");
  })
  .catch((error) => {
    console.log(error);
  });

http.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`serve at http://localhost:${port}`);
});

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET, POST,PUT,DELETE",
  })
);
app.use(
  session({
    secret: "535ds6r64345xcas344asdsd",
    cookie: {
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // One week in milliseconds
    },
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", mainRouter);
