// /api/users

const { User } = require("../../models");
const router = require("express").Router();
const db = require("../../config/connection");

// GET all users

router.get("/all-users", (req, res) => {
  User.find().then((user) => {
    return res.json({ status: 200, success: true, data: user });
  });
});

// GET a single user by its _id and populated thought and friend data

router.get("/find-user/:id", (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log("Uh Oh, something went wrong");
      res.status(500).json({ message: "something went wrong" });
    }
  });
});

// POST/Create a new user:

router.post("/create", (req, res) => {
  console.log("body:", req.body);
  User.create({ username: req.body.username, email: req.body.email })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

//PUT to update a user by its _id

router.put("/update-user/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    email: req.body.email,
  })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

//DELETE to remove user by its _id

module.exports = router;
