const express = require("express");
const router = express.Router();
let Comment = require("../models/commentModel");

// Get all comments
router.route("/:event_id").get(async (req, res) => {
  await Comment.find({ event_id: req.params.event_id })
    .then((Comments) => res.json(Comments))
    .catch((err) => {
      res.status(400).json("Error" + err);
    });
});

// Post a comment
router.route("/add").post(async (req, res) => {
  const comment = req.body.comment;
  const username = req.body.username;
  const event_id = req.body.event_id;
  const newComment = new Comment({ comment, username, event_id });

  await newComment
    .save()
    .then(() => res.json("Comment added"))
    .catch((err) => {
      res.status(400).json("Error" + err);
    });
});

// Delete comment
router.route("/delete/:id").patch(async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Comment Deleted"))
    .catch((err) => res.status(400).json("error" + err));
});

module.exports = router;
