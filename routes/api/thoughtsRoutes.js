const { User, Thought } = require("../../models");
const router = require("express").Router();
const db = require("../../config/connection");

const {
  getAllThoughts,
  findThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

//api/thoughts routes
//get all thoughts - works- do I need to seed this thought data?

router.route("/all-thoughts").get(getAllThoughts);

//get a thought by its id- works.

router.route("/find-thought/:id").get(findThoughtById);

//POST to create new thought, push created thought's _id to the associated
//user's thoughts array field - works

router.route("/create-thought").post(createThought);

//PUT to update a thought by its _id - work.

router.route("/update-thought/:id").put(updateThoughtById);

//delete a thought by its ID - works

router.route("/delete-thought/:thoughtId").delete(deleteThoughtById);

//api/thoughts/:thoughtId/reactions
//POST to create a reaction stored in a single thought's reactions array field

router.route("/:thoughtId/reaction").post(createReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value

router.route("/:thoughtId/:reactionId").delete(deleteReaction);

//Application deletes a user's associated thoughts when the user is deleted.
module.exports = router;
