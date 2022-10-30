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
  User.findOne(
    {
      user: req.params.user_id, //correct syntax?
    },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log("Uh Oh, something went wrong");
        res.status(500).json({ message: "something went wrong" });
      }
    }
  );
});

// POST/Create a new user:

//Does not go into correct area.

router.post("/create", (req, res) => {
  User.create({ username: req.body.username, email: req.body.email })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
