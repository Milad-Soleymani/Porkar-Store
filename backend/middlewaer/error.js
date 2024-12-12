const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error'

    //! wrong mongo id error
    if (err.name = "CastError") {
        const message = `Resource is not found with this id ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //! Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)}, Entered`;
        err = new ErrorHandler(message, 400);
    }

    //! wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = 'Invalid URL, Please login again';
        err = new ErrorHandler(message, 400);
    }

    //! jwt expired error
    if (err.name === "TokenExpiredError") {
        const message = 'Your URL has expired, Please login again';
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}