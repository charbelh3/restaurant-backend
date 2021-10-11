const express = require('express');
const app = express();
const userRouter = require('./Routes/user');

app.use(express.json({
    extended: true
}));

app.use("/user", userRouter);


app.listen(3000);