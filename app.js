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
const adminUserRouter = require('./Routes/Admin/user');

const authorization = require('./Middlewares/authorization');

const errorHandler = require('./Middlewares/errorHandler');
const config = require("./Configuration/config")



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage })


app.use(express.json({
    extended: true
}));


app.post('/profile', upload.single('image'), function (req, res, next) {
    res.send(req.file)

})


//Routes
app.use("/user", userRouter);
app.use("/categoryItem", categoryItemRouter);
app.use("/address", authorization.isAuthorizedUser, addressRouter);
app.use("/order", authorization.isAuthorizedUser, orderRouter);

app.use("/admin/category", authorization.isAdmin, adminCategoryRouter);
app.use("/admin/item", authorization.isAdmin, adminItemRouter);
app.use("/admin/branch", authorization.isAdmin, adminbranchRouter);
app.use("/admin/order", authorization.isAdmin, adminOrderRouter);
app.use("/admin/user", authorization.isAdmin, adminUserRouter);

app.use(errorHandler);


mongoose.connect(config.connectionString).then(() => {
    app.listen(3000);
    console.log("Connected!")
}).catch(() => { console.log("Error connecting to database..") })