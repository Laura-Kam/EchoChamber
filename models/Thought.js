const mongoose = require("mongoose");

const mongoose = require("mongoose");

//create reactionSchema only.
const reactionSchema = new mongoose.Schema({
  reactionId: { type: Schema.Types.ObjectId, default: newObjectId },
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now, //will this Date object be enough.
    get: (date) => timeSince(date), //needs function attached to timesince?
  },
});

//create thoughtSchema first.
const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  createdAt: {
    type: Date,
    default: Date.now, //will this Date object be enough.
    get: (date) => timeSince(date), //needs function attached to timesince?
  },
  username: { type: String, required: true },
  //link to subdocument reaction schema.
  reaction: [reactionSchema],
});

//Schema Settings

//Create a virtual called reactionCount that retrieves the
//length of the thought's reactions array field on query.

thoughtSchema.virtual("reactionCount").get(function () {
  return this.thoughtSchema.reactions.length;
});

// Uses mongoose.model() to create model
const User = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
