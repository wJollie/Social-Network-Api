const { schema, model } = require("mongoose");

const userSchema = new schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Your email was Wrong,please enter a valid email address",
      ],
    },
    thoughts: [
      {
        type: schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);
module.exports = User;
