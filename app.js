const express = require('express');
const app = express();
const mongoose = require('mongoose')
const userRouter = require('./Routes/user');
const adminCategoryRouter = require('./Routes/Admin/category');
const adminItemRouter = require('./Routes/Admin/item');
const categoryItemRouter = require('./Routes/categoryItems');
const addressRouter = require('./Routes/address');

const authorization = require('./Middlewares/authorization');

const errorHandler = require('./Middlewares/errorHandler');
const config = require("./Configuration/config")

app.use(express.json({
    extended: true
}));

app.use("/user", userRouter);
app.use("/categoryItem", categoryItemRouter);
app.use("/addressRouter", authorization.isAuthorizedUser, addressRouter);
app.use("/admin/category", authorization.isAdmin, adminCategoryRouter);
app.use("/admin/item", authorization.isAdmin, adminItemRouter);
app.use(errorHandler);


mongoose.connect(config.connectionString).then(() => {
    app.listen(3000);
    console.log("Connected!")
}).catch(() => { console.log("Error connecting to database..") })