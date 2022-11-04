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
} = require("../../controllers/userController");
// GET all users

router.route("/all-users").get(getAllUsers);

// GET a single user by its _id and populated thought and friend data

router.route("/find-user/:id").get(findUserById);

// POST/Create a new user:

router.router("/create").post(createUser);

//PUT to update a user by its _id

router.router("/update-user/:id").put(updateUserById);

//DELETE to remove user by its _id - correct

router.router("/delete-user/:id").delete(deleteUserById);

module.exports = router;
