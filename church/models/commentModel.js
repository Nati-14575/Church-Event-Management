const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    event_id: {
      type: String,
      requried: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
