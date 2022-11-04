const { User, Thought } = require("../models");
const thoughtsController = {
  getAllThoughts(req, res) {
    Thought.find().then((thought) => {
      return res.json({ status: 200, success: true, data: thought });
    });
  },
  findThoughtById(req, res) {
    Thought.findById(req.params.id, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log("Uh Oh, something went wrong");
        res.status(500).json({ message: "something went wrong" });
      }
    });
  },
  createThought(req, res) {
    Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
      userId: req.body.userId,
    })
      .then((thought) => {
        console.log("body:", req.body);
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Post created, but found no user with that ID" })
          : res.json("Created the post 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThoughtById(req, res) {
    return Thought.findByIdAndUpdate(
      req.params.id,
      {
        thoughtText: req.body.thoughtText,
      },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  deleteThoughtById(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        )
      )
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ message: "Thought deleted but user not found" });
        } else {
          res.json({ message: "Thought deleted and user updated" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No reaction created" })
          : res.json(reaction)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No reaction deleted" })
          : res.json(reaction)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtsController;
