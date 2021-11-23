const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "name can not be empty"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is already taken"],
    lowercase: true,
    validate: [validator.isEmail, "email is not valid"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [8, "password has to be atleast 8 characters long"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords don't match",
    },
    select: false,
  },
  location: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  photo: { type: String, default: "default.jpg" },
  eventsJoined: [
    { type: mongoose.Schema.ObjectId, ref: "Event", default: null },
  ],
  eventsMayJoin: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
      default: null,
    },
  ],
  events: [
    {
      type: mongoose.Schema.ObjectId,
      default: null,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,

  newUserToken: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "eventsJoined",
  });
  next();
});
userSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "eventsMayJoin",
  });
  next();
});
userSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "events",
  });
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  this.confirmPassword = undefined;
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = User = mongoose.model("User", userSchema);
