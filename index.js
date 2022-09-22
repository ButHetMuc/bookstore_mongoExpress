const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authorRouter  = require('./routes/author');
const bookRouter = require('./routes/book');


app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));


dotenv.config();
mongoose.connect((process.env.CONNECTDB_URL),()=>{
    console.log("connected to mongodb");
})


app.use('/v1/author', authorRouter);

app.use('/v1/book',bookRouter);

app.listen(8000,()=>{
    console.log('server is running');
})