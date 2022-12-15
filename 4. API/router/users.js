const express = require("express");
const { User, validate } = require("../models/user");

const router = express.Router();

// Register a new user

router.get("/", async (req, res) => {
  const { email, name } = req.query;

  // If already user exists
  let user = await User.find({ email, name });

  res.send(user);
});

router.get("/:id", async (req, res) => {
  let user = await User.findOne({ id });
  if (!user) return res.status(404).send("Invalid user id.");

  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // If already user exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  // save new user
  const { name, email } = req.body;
  user = new User({ name, email });

  await user.save();

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  let user = await User.findOne({ id });
  if (!user) return res.status(404).send("Invalid user id.");

  await User.findOneAndRemove({ user });

  res.status(201).send();
});

module.exports = router;
