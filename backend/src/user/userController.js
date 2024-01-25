var userService = require('../user/userService')
const User = require('./userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const companyService = require('../company/companyService')
const contactService = require('../contact/contactService')

var companyIdCounter = 1;

var register = async (req, res) => {
    try {
        console.log('Received registration request:', req.body);
        console.log('Request body:', req.body);
        const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
        console.log('Hashed password:', hashedPassword);


        const newUser = new User({
            userFirstName: req.body.userFirstName,
            userLastName: req.body.userLastName,
            email: req.body.email,
            userPassword: hashedPassword,
            userBirthDay: req.body.userBirthDay,
            userIban: req.body.userIban,
            role: req.body.role || 'user'
        });
        
        console.log('Creating user:', newUser);


        await newUser.save();

        const companyId1 = companyIdCounter++;
        const companyId2 = companyIdCounter++;
        const companyId3 = companyIdCounter++;

        await companyService.createCompany(
            companyId1,
            'Sign8 Gmbh',
            'Germany',
            'Munich',
            '123-12',
            'Street 123',
            'contact1@company1.com',
            [
                {
                    contactFirstName: 'Contact 1',
                    contactLastName: 'Last 1',
                    contactMail: 'contact1@company1.com',
                    contactPhoneNumber: '123456789'
                }
            ],
            req.body.email,
            new Date().toLocaleDateString()
        );

        await companyService.createCompany(
            companyId2,
            'Transform8 Gmbh',
            'Germany',
            'Munich',
            'Zip 123',
            'Street 123',
            'contact1@company2.com',
            [
                {
                    contactFirstName: 'Contact 2',
                    contactLastName: 'Last 2',
                    contactMail: 'contact1@company2.com',
                    contactPhoneNumber: '123456789'
                }
            ],
            req.body.email,
            new Date().toLocaleDateString()
        );

        await companyService.createCompany(
            companyId3,
            'Transform8 Portugal',
            'Portugal',
            'Porto',
            'Zip 123',
            'Street 123',
            'contact1@company3.com',
            [
                {
                    contactFirstName: 'Contact 3',
                    contactLastName: 'Last 3',
                    contactMail: 'contact1@company3.com',
                    contactPhoneNumber: '123456789'
                }
            ],
            req.body.email,
            new Date().toLocaleDateString()
        );

        const contactData1 = {
            contactIdNumber: '1',
            contactMail: 'sign8@sign8.de',
            contactFirstName: 'John',
            contactLastName: 'Lennon',
            contactPhoneNumber: '+49 123 123 678',
            companyId: companyId1
        };

        const contactData2 = {
            contactIdNumber: '2',
            contactMail: 'transform8@transform8.de',
            contactFirstName: 'Viktoria',
            contactLastName: 'Hell',
            contactPhoneNumber: '+49 989 123 678',
            companyId: companyId2
        };

        const contactData3 = {
            contactIdNumber: '3',
            contactMail: 'transform8@transform8.pt',
            contactFirstName: 'Nuno',
            contactLastName: 'Sousa',
            contactPhoneNumber: '+351 912 123 678',
            companyId: companyId3
        };
        await contactService.createContacts(req.body.email, companyId1, contactData1);
        await contactService.createContacts(req.body.email, companyId2, contactData2);
        await contactService.createContacts(req.body.email, companyId3, contactData3);


        console.log('User created successfully');


        res.send({ "status": true, "message": "User created successfully" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ "status": false, "message": "Error creating user" });
    }
};

const login = async (req, res, next) => {
    try {
        const username = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ $or: [{ email: username }] });

        if (user) {
            const result = await bcrypt.compare(password, user.userPassword);

            if (result) {
                const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.cookie('jwt', token, { httpOnly: true });

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

var updateUser = async (req, res) => {
    const { emailToUpdate, updatedEmail, updatedPassword, updatedData } = req.body;

    try {
        var result = await userService.updateUser(emailToUpdate, updatedEmail, updatedPassword, updatedData);
        
        if (result.success) {
            res.status(result.status).json({ "status": true, "message": "User updated successfully" });
        } else {
            res.status(result.status).json({ "status": false, "message": result.message });
        }
    } catch (error) {
        res.status(500).json({ "status": false, "message": "Internal Server Error" });
    }
};

module.exports = { getAllUsers, deleteUser, updateUser, register, login }