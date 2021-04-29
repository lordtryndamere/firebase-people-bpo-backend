const express = require("express");
const userRouter = require("./routes/user.router");
const pointRouter = require("./routes/points.router");

const app = express();



app.use( userRouter );
app.use( pointRouter );

module.exports = app;