let { Types, Schema } = require("mongoose");
let mongoose = require("mongoose");

//create reactionSchema only.
const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    }, //newobjId
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocalString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//create thoughtSchema first.
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: {
      type: Date,
      default: Date.now, //will this Date object be enough.
      get: (date) => date.toLocalString(),
    },
    username: { type: String, required: true },
    //link to subdocument reaction schema.
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

//Schema Settings

//Create a virtual called reactionCount that retrieves the
//length of the thought's reactions array field on query.

thoughtSchema.virtual("reactionCount").get(function () {
  return this.thoughtSchema.reactions.length;
});

// Uses mongoose.model() to create model
const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
