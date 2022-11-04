const { User, Thought } = require("../models");
const userController = {
  getAllUsers(req, res) {
    User.find().then((user) => {
      return res.json({ status: 200, success: true, data: user });
    });
  },
  findUserById(req, res) {
    User.findById(req.params.id, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log("Uh Oh, something went wrong");
        res.status(500).json({ message: "something went wrong" });
      }
    });
  },
  createUser(req, res) {
    User.create({ username: req.body.username, email: req.body.email })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUserById(req, res) {
    User.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      email: req.body.email,
    })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUserById(req, res) {
    User.findByIdAndRemove(req.params.id, {
      username: req.body.username,
      email: req.body.email,
    })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
