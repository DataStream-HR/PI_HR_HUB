const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const mongoose = require("mongoose");
const Role = require("../../PI/backend/models/Role");
const db = require("../../PI/backend/models");
const candidate = require("./routes/Candidate/CandidateAPI");
const hr = require("./routes/HR/HRAPI");
const dbConfig = require("./config/DBconfig");
const multer = require("multer");
var path = require("path");
var debug = require("debug")("server:server");
var http = require("http");
var socket = require("socket.io");
var connectIo = require("./chatbotService");
const eventsmodel = require("./Controllers/events/eventController");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use("/job", job);
app.use("/events",eventsmodel);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
require("../../PI/backend/routes/User/auth")(app);
require("../../PI/backend/routes/User/userRoute")(app);

require("./routes/User/auth")(app);
require("./routes/User/userRoute")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to hrbub application." });
});
app.use("/candidate", candidate);
app.use("/hr", hr);
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
// SET STORAGE

var storage = multer.diskStorage({
  },
    cb(null, "uploads");
  destination: function (req, file, cb) {
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

var upload = multer({ storage: storage });
app.get("/", function (req, res) {
  res.send("Hello HR HUB");
});
app.post("/uploadfile", upload.single("file"), (req, res, next) => {
  const file = req.file;
    const error = new Error("Please upload a file");
  if (!file) {
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

module.exports = router;
