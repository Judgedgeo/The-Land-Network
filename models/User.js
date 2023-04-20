const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },

    // refers to thgouth models and values for the id
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],



    // refers to user model and values for the id
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },


  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
