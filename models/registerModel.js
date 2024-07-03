const mongoose = require("mongoose");

const registerSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please, enter the user's Username"],
    },

    email: {
      type: String,
      required: [true, "Please, enter the user's email address"],
    },

    password: {
      type: String,
      required: [true, "Please, enter the user's password"],
    },
  },
  {
    timestamps: true,
  }
);