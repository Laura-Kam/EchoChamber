const { User, Thought } = require("../models");
const userController = {
  getAllUsers(req, res) {
    User.find().then((user) => {
      return res.json({ status: 200, success: true, data: user });
    });
  },

  //findUserByid and populate thoughts and friends.

  findUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: "thoughts",
        select: "-_v",
      })
      .populate({
        path: "friends",
        select: "-_v",
      })
      .select("-_v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that Id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
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
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(["Friend added 🎉", userData])
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "Friend not deleted!" })
          : res.json(["Friend deleted 🎉", userData])
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
