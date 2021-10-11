const express = require('express');
const app = express();
const mongoose = require('mongoose')
const userRouter = require('./Routes/user');
const categoryRouter = require('./Routes/category');
const itemRouter = require('./Routes/item');

const authorization = require('./Middlewares/authorization');

const errorHandler = require('./Middlewares/errorHandler');
const config = require("./Configuration/config")

app.use(express.json({
    extended: true
}));

app.use("/user", userRouter);
app.use("/category", authorization.isAdmin, categoryRouter);
app.use("/item", authorization.isAdmin, itemRouter);
app.use(errorHandler);


mongoose.connect(config.connectionString).then(() => {
    app.listen(3000);
    console.log("Connected!")
}).catch(() => { console.log("Error connecting to database..") })