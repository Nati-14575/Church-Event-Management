const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    image: {
      type: String,
      default: "default.jpg",
    },
    posterPhoto: { type: String },
    username: {
      type: String,
    },
    eventname: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    location: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
      select: true,
    },
    peoplesGoing: {
      type: [String],
      default: null,
    },
    peoplesWhoMightGo: {
      type: [String],
      default: null,
    },
    likes: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.pre(/^find/, async function (next) {});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
