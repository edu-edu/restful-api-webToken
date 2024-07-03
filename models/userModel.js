const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please, enter the Username"],
        },
        
        email: {
            type: String,
            required: [true, "Please, enter the user email address"],
            unique: [true, "The email address is already taken and unavailable anymore"],
        },

        password: {
            type: String,
            required: [true, "Please, add the user Password"]
        },
    },
    {
        timestamps: true,    
    }
);

// module.exports = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);