const express = require("express");
const router = express.Router();

const ShopUser = require("../models/userModel");
const getToken = require("../util");

router.get("/createadmin", async (req, res) => {
  try {
    const user = new ShopUser({
      name: "Kaiser",
      email: "ireza.kaiser00@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();

    res.send(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/signin", async (req, res) => {
  const user = await ShopUser.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: getToken(user),
    });
  } else {
    res.status(401).send({ message: "Invalid Email or Password" });
  }
});

router.post("/register", async (req, res) => {
  const user = new ShopUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (user) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ message: "Invalid User Data" });
  }
});

module.exports = router;
