const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require("./middlewares/error")
const path = require('path');

require('dotenv').config({path:'backend/config/config.env'});

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const user = require('./routes/userRoute');
const data = require('./routes/dataRoute');

app.use('/api/v1', user);
app.use('/api/v1', data);

app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

module.exports = app;