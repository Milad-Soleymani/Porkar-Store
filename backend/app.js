const express = require('express');
const ErrorHandler = require('./middlewaer/error');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
}));
app.use("/", express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))


// ! config
if (process.env.NODE_ENV != "PRODUCTION") {
    require('dotenv').config({
        path: "backend/config/.env"
    })
}

// ! import Routes
const user = require('./controller/user');

app.use('/api/v2/user', user)

// ! it's for ErrorHandling
console.log(ErrorHandler)

module.exports = app;