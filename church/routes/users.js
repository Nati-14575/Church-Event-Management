const router = require("express").Router();
let User = require("../models/userModel");
const authController = require("./authController");

// Get and

router.route("/").get(async (req, res, next) => {
  await User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("error" + err));
});

// Upload a photo

router.post(
  "/uploadImage",
  authController.uploadPhoto,
  authController.updateMe
);
// Add a user

router.post("/add", authController.signup);

router.post("/verify/:token", authController.verifyUser);
// Find one user
router.route("/:id").get(async (req, res) => {
  await User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("error" + err));
});

// Update User
router.route("/add/:id").patch(async (req, res) => {
  await User.findByIdAndUpdate(req.params.id).then((user) => {
    user.username = req.body.username;
    user.password = req.body.password;

    user
      .save()
      .then(() => res.json("user updated"))
      .catch((err) => res.status(400).json("error" + err));
  });
});

// Delete User

router.route("/:id").delete(async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted"))
    .catch((err) => res.status(400).json("error" + err));
});

router.post("/getMe", authController.getMe);

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);

module.exports = router;
