const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    User_id :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },   

    name: {
      type: String,
      required: [true, "Please, enter the contact's name"],
    },

    email: {
      type: String,
      required: [true, "Please, enter the contact's email address"],
    },

    phone: {
      type: String,
      required: [true, "Please, enter the contact's phone"],
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Contacts", contactSchema)