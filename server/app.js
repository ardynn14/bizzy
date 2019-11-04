if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const DB = process.env.DB;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(DB, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log("Database not connected");
    } else {
        console.log(`Connected to ${process.env.DB}`);
    }
})

app.use('/', router);
app.use(errorHandler);

app.listen(port, function () {
    console.log(`Listening on Port : ${port}`);
});
