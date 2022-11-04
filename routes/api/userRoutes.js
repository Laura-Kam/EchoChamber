// /api/users

const { User } = require("../../models");
const router = require("express").Router();
const db = require("../../config/connection");
const {
  getAllUsers,
  findUserById,
} = require("../../controllers/userController");
// GET all users

router.route("/all-users").get(getAllUsers);

// GET a single user by its _id and populated thought and friend data

router.route("/find-user/:id").get(findUserById);

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

//DELETE to remove user by its _id - correct

router.delete("/delete-user/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, {
    username: req.body.username,
    email: req.body.email,
  })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
