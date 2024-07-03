const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const registerUser = asyncHandler (async(req, res) => {
    const { username, email, password } = req.body;

    if ((!username || !email || !password)){
        res.status(400);
        throw new Error("All fields are mandatory!");
    };

    const userAvailable = await User.findOne({ email });
    if (userAvailable){
        res.status(400);
        throw new Error("Email is already taken");
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
   
    res.status(200).json(`${username} just signed up`);
    console.log("register the user");
});


const loginUser = asyncHandler (async(req, res) => {
  const { email, username, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  };

  const user = await User.findOne({ email });
  
  if (user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "15m"},
    )


    res.status(200).json( accessToken);
  } else {
    res.status(400);
    throw new Error("Email or password is invalid;")
  };

//   res.status(200).json(`${username} logged in`);
//   console.log("login the user");
});


const currentUser = asyncHandler (async (req, res) => {
    // res.status(200).json( "current user information" );
    res.status(200).json(req.user);
    console.log("current user information");
});

module.exports = {
    registerUser, loginUser, currentUser
}