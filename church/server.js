const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const EventsRoute = require("./routes/events");
const UserRoute = require("./routes/users");
const CommentRoute = require("./routes/comments");
const DATABASE =
  "mongodb+srv://Nati:kwHDjyCpirDjKO7d@church.4wt2j.mongodb.net/church";

const DATABASE_LOCAL = "mongodb://localhost:27017/mern";

const PORT = process.env.PORT || 5000;

app.enable("trust proxy");

app.use(cors());
app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  next();
});
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "secretkeychurcheventmanagement123",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
//
app.use("/api/events", EventsRoute);
app.use("/api/users", UserRoute);
app.use("/api/comments", CommentRoute);

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
//
try {
  app.listen(PORT, () => console.log("running on port", PORT));
} catch (err) {
  console.log(err);
}
mongoose
  .connect(DATABASE_LOCAL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected successfully");
  });
