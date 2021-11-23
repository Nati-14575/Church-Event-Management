const fs = require("fs");
let Event = require("../models/eventModel");
let imageName;
const multer = require("multer");

// Get events

var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "../church/client/src/assets/events/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") cb(null, true);
  else cb(new Error("Please use an image format"), false);
};

const upload = multer({ storage: storage, fileFilter: filter }).single("image");

exports.addEvent = async (req, res, next) => {
  console.log(req.body);
  try {
    const eventname = req.body.eventname;
    const location = req.body.location;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const amount = Number(req.body.amount);
    const username = req.body.username;

    const image = imageName;

    const createdEvent = new Event({
      username,
      eventname,
      description,
      duration,
      date,
      amount,
      location,
      image,
    });

    console.log(createdEvent);

    await createdEvent
      .save()
      .then(() => res.json("Event added"))
      .catch((err) => res.status(400).json("Error" + err));
  } catch (err) {
    console.log(err);
  }
};

exports.uploadPhoto = async (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(req.file.filename);
    res.status(200).send(req.file);
    imageName = req.file.filename;

    next();
  });
};
