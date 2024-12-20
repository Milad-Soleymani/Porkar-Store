const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { upload } = require('../multer');
const User = require('../model/user')
const catchAsyncErrors = require('../middlewaer/catchAsyncErrors')
const ErrorHandler = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendmail');
const sendToken = require('../utils/jwtToken');
require('express-debug')
require('express-async-errors');
require('dotenv').config()


router.post('/create-user', upload.single('file'), async (req, res, next) => {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email })

    if (userEmail) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: "Error deleting file" })
            }
        })
        return next(new ErrorHandler('User already exists', 400))
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
    };


    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`


    await sendMail({
        email: user.email,
        subject: 'Activate your account',
        message: `Hello ${user.name}, please click on this link to activate your account: ${activationUrl}`
    })
    res.status(201).json({
        success: true,
        message: `Please check your email:- ${user.email} to activate your account!`
    })
})

// ! create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.SECRET, {
        expiresIn: "5m"
    })
}

// ! activate user
router.post('/activation', catchAsyncErrors(async (req, res, next) => {
    try {
        const { activation_token } = req.body;

        const newUser = jwt.verify(activation_token, process.env.SECRET);

        if (!newUser) {
            return next(new ErrorHandler('Invalid token', 400))
        }
        const { name, email, password, avatar } = newUser;

        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler('User alerdy exists', 400))
        }

        user = await User.create({
            name,
            email,
            password,
            avatar
        });

        sendToken(user, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))


// ! login user
router.post(
    "/login-user",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                return next(new ErrorHandler("Please provide the all fields!", 400));
            }
            console.log("SECRET:", process.env.SECRET);
            console.log("Activation Token:", activation_token);


            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return next(new ErrorHandler("User doesn't exists!", 400));
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return next(
                    new ErrorHandler("Please provide the correct information", 400)
                );
            }

            sendToken(user, 201, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }))


module.exports = router;