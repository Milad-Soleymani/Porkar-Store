const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { upload } = require('../multer');
const User = require('../model/user')
const ErrorHandler = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendmail');
require('express-debug')
require('express-async-errors');


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
            } else {
                res.json({ message: 'file deleted successfully' })
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

    const newUser = await User.create(user)

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
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m"
    })
}

// ! activate user




module.exports = router;