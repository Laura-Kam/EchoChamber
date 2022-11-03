const { User, Thought } = require("../../models");
const router = require("express").Router();
const db = require("../../config/connection");

//api/thoughts routes
//get all thoughts - works- do I need to seed this thought data?

router.get("/all-thoughts", (req, res) => {
  Thought.find().then((thought) => {
    return res.json({ status: 200, success: true, data: thought });
  });
});

//get a thought by its id- works.

router.get("/find-thought/:id", (req, res) => {
  Thought.findById(req.params.id, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log("Uh Oh, something went wrong");
      res.status(500).json({ message: "something went wrong" });
    }
  });
});

//POST to create new thought, push created thought's _id to the associated
//user's thoughts array field - works

router.post("/create-thought", (req, res) => {
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
});

//PUT to update a thought by its _id - work.

router.put("/update-thought/:id", (req, res) => {
  return Thought.findByIdAndUpdate(
    req.params.id,
    {
      thoughtText: req.body.thoughtText,
    },
    { new: true }
  )
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
});

//delete a thought by its ID - works

router.delete("/delete-thought/:thoughtId", (req, res) => {
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
        res.status(404).json({ message: "Thought deleted but user not found" });
      } else {
        res.json({ message: "Thought deleted and user updated" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

module.exports = router;
