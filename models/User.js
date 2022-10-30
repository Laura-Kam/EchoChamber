let { Types, Schema } = require("mongoose");
let mongoose = require("mongoose");

//create userSchema first.
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    //Array of _id values referencing the Thought model??
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//Schema Settings

//Create a virtual called friendCount that retrieves the
//length of the user's friends array field on query.

userSchema.virtual("friendCount").get(function () {
  return this.userSchema.friends.length;
});

// Uses mongoose.model() to create model
const User = mongoose.model("User", userSchema);

module.exports = User;
