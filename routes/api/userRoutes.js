// /api/users

const { User } = require("../../models");
const router = require("express").Router();
const db = require("../../config/connection");
const {
  getAllUsers,
  findUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");
// GET all users

router.route("/all-users").get(getAllUsers);

// GET a single user by its _id and populated thought and friend data

router.route("/find-user/:userId").get(findUserById);

// POST/Create a new user - new username and email

router.route("/create").post(createUser);

//PUT to update a user by its _id
//use previous id - use get request again and refresh
router.route("/update-user/:id").put(updateUserById);

//DELETE to remove user by its _id - correct

router.route("/delete-user/:id").delete(deleteUserById);

//post to add a new friend to a user's friend list.

router.route("/:userId/friends/:friendId").post(addFriend);

//delete friend

router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
