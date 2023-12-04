var userService = require('../user/userService')
const User = require('./userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var register = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);

        const newUser = new User({
            userFirstName: req.body.userFirstName,
            userLastName: req.body.userLastName,
            email: req.body.email,
            userPassword: hashedPassword,
            userBirthDay: req.body.userBirthDay,
            userIban: req.body.userIban
        });
        

        await newUser.save();

        res.send({ "status": true, "message": "User created successfully" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ "status": false, "message": "Error creating user" });
    }
};

var login = async (req, res, next) => {
    try {
        const username = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ $or: [{ email: username }] });

        if (user) {
            const result = await bcrypt.compare(password, user.userPassword);

            if (result) {
                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({
                    status: true,
                    message: 'Login Successful!',
                    token
                });
            } else {
                res.json({
                    status: false,
                    message: 'Password does not match!'
                });
            }
        } else {

            res.json({
                status: false,
                message: 'No user found!'
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: false, message: 'Error during login' });
    }
};


var postUser = async (req, res) => {
    var status = await userService.createUser(req.body.email, req.body.firstName, req.body.lastName, req.body.password, req.body.birthDay, req.body.iban);
    if (status) {
        res.send({ "status": true, "message": "User created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
}

var getAllUsers = async (req, res) => {
    var users = await userService.getAllUsers();
    if (users) {
        res.send({ "status": true, "message": "User fetched successfully", data: users });
    } else {
        res.send({ "status": false, "message": "Error getting user" });
    }
}

var deleteUser = async (req, res) => {
    var status = await userService.removeUser(req.body.email);
    if (status) {
        res.send({ "status": true, "message": "User deleted sucessfully" });
    } else {
        res.send({ "status": true, "message": "Error deleting user" })
    }
}

module.exports = { postUser, getAllUsers, deleteUser, register, login }