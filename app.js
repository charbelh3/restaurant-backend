const express = require('express');
const app = express();
const mongoose = require('mongoose')
const userRouter = require('./Routes/user');
const errorHandler = require('./Middlewares/errorHandler');

const config = require("./Configuration/config")

app.use(express.json({
    extended: true
}));

app.use("/user", userRouter);
app.use(errorHandler);


mongoose.connect(config.connectionString).then(() => {
    app.listen(3000);
    console.log("Connected!")
}).catch(() => { console.log("Error connecting to database..") })