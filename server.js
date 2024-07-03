const express = require("express");
const nodemon = require("nodemon");
const dotenv = require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/dbConnection");
const port = process.env.PORT || 5000;

connectDB();
const app = express();



app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App listening at ${port}`);
});