const express = require('express');
const app = express();
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');

const userRouter = require('./Routes/user');
const categoryItemRouter = require('./Routes/categoryItems');
const addressRouter = require('./Routes/address');
const orderRouter = require('./Routes/order');

//admin routes
const adminCategoryRouter = require('./Routes/Admin/category');
const adminItemRouter = require('./Routes/Admin/item');
const adminbranchRouter = require('./Routes/Admin/branch');
const adminOrderRouter = require('./Routes/Admin/order');

const authorization = require('./Middlewares/authorization');

const errorHandler = require('./Middlewares/errorHandler');
const config = require("./Configuration/config")



const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false);
    }
}



app.use(express.json({
    extended: true
}));

app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use('/image', express.static(path.join(__dirname, 'images')));

//Routes
app.use("/user", userRouter);
app.use("/categoryItem", categoryItemRouter);
app.use("/address", authorization.isAuthorizedUser, addressRouter);
app.use("/order", authorization.isAuthorizedUser, orderRouter);

app.use("/admin/category", authorization.isAdmin, adminCategoryRouter);
app.use("/admin/item", authorization.isAdmin, adminItemRouter);
app.use("/admin/branch", authorization.isAdmin, adminbranchRouter);
app.use("/admin/order", authorization.isAdmin, adminOrderRouter);

app.use(errorHandler);


mongoose.connect(config.connectionString).then(() => {
    app.listen(3000);
    console.log("Connected!")
}).catch(() => { console.log("Error connecting to database..") })