const router = require("express").Router();
const eventController = require("./eventController.js");
let Event = require("../models/eventModel");
let User = require("../models/userModel");

let joinedUsers = [];
// Get events

router.route("/").get(async (req, res, next) => {
  await Event.find()
    .sort("-createdAt")
    .populate("Event")
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("error" + err));
});

// Post an event

router.post("/add", eventController.addEvent);
router.post("/addEventPhoto", eventController.uploadPhoto);

// Get and display one event by id

router.route("/:id").get(async (req, res) => {
  await Event.findById(req.params.id)
    .then((event) => {
      const availableSeats = event.amount - event.peoplesGoing.length;
      res.json({ event, availableSeats });
    })
    .catch((err) => res.status(400).json("error" + err));
});

// Find event and update it by using id

router.route("/add/:id").patch(async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id).then((event) => {
    event.username = req.body.username;
    event.description = req.body.description;
    event.duration = Number(req.body.duration);
    event.date = Date.parse(req.body.date);

    event
      .save()
      .then(() => res.json("event updated"))
      .catch((err) => res.status(400).json("error" + err));
  });
});

router.route("/joinEvent/:id").post(async (req, res) => {
  const event = await Event.findById(req.params.id);
  console.log(event);

  const user = await User.findById(req.body.userId);

  event.peoplesGoing = event.peoplesGoing.concat([user.email]);

  await event.save();

  user.eventsJoined = user.eventsJoined.concat([req.params.id]);
  user.events = user.events.concat([req.params.id]);

  await user.save();

  res.status(200).json({
    status: "success",
    message: "You have joined this event",
  });
});

router.route("/mayjoinEvent/:id").post(async (req, res) => {
  const event = await Event.findById(req.params.id);

  const user = await User.findById(req.body.userId);

  event.peoplesWhoMightGo = event.peoplesWhoMightGo.concat([user.email]);

  await event.save();

  user.events = user.events.concat([req.params.id]);

  user.eventsMayJoin = user.eventsMayJoin.concat([req.params.id]);

  await user.save();

  res.status(200).json({
    status: "success",
    message: "You have been added",
  });
});

router.route("/myEvent/:id").get(async (req, res) => {
  const user = await User.findById(req.params.id);

  const eventsJoined = user.eventsJoined;
  const eventsMayJoin = user.eventsMayJoin;

  res.json({ eventsJoined, eventsMayJoin });
});

router.route("/joinedPeoples/:id").get(async (req, res) => {
  const events = await Event.findById(req.params.id);

  let emails = [];
  events.peoplesGoing.map((email) => {
    emails = emails.concat(email);
  });

  async function find(item) {
    const person = await User.findOne({ email: item });
    return person;
  }
  async function get() {
    let promises = [];
    let joinedPeoples = [];
    emails.map((email) => {
      promises = promises.concat(find(email));
    });

    joinedPeoples = await Promise.all(promises);

    res.json(joinedPeoples);
  }

  get();
});

router.route("/mayJoinPeoples/:id").get(async (req, res) => {
  const events = await Event.findById(req.params.id);

  let emails = [];
  events.peoplesGoing.map((email) => {
    emails = emails.concat(email);
  });

  async function find(item) {
    const person = await User.findOne({ email: item });
    return person;
  }
  async function get() {
    let promises = [];
    let mayJoinPeoples = [];
    emails.map((email) => {
      promises = promises.concat(find(email));
    });

    mayJoinPeoples = await Promise.all(promises);

    res.json(mayJoinPeoples);
  }

  get();
});

// Delete Eventu

router.route("/:id").delete(async (req, res) => {
  await Event.findByIdAndDelete(req.params.id)
    .then(() => res.json("event deleted"))
    .catch((err) => res.status(400).json("error" + err));
});

router.route("/try").get(async (req, res) => {
  console.log("req.session.user");
});

module.exports = router;
