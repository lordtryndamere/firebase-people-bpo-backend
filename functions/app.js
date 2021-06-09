const express = require("express");
const userRouter = require("./routes/user.router");
const helmet = require('helmet');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(helmet());
app.use(cors());
app.use( userRouter );


module.exports = app;