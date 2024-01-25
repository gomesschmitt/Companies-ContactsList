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
            role: req.body.role || 'user',
            companies: []
        });

        console.log('Creating user:', newUser);

        await newUser.save();

        const createCompany = async (companyId, name, country, city, zip, street, mail, contacts) => {
            return await companyService.createCompany(
                companyId,
                name,
                country,
                city,
                zip,
                street,
                mail,
                contacts,
                req.body.email,
                new Date().toLocaleDateString()
            );
        };

        const createContact = async (companyId, contactData) => {
            return await contactService.createContacts(req.body.email, companyId, contactData);
        };

        const companyId1 = companyIdCounter++;
        const companyId2 = companyIdCounter++;
        const companyId3 = companyIdCounter++;

        const companyData1 = {
            name: 'Sign8 Gmbh',
            country: 'Germany',
            city: 'Munich',
            zip: '123-12',
            street: 'Street 123',
            mail: 'contact1@company1.com',
            contacts: [
                {
                    contactFirstName: 'Contact 1',
                    contactLastName: 'Last 1',
                    contactMail: 'contact1@company1.com',
                    contactPhoneNumber: '123456789'
                }
            ]
        };

        const companyData2 = {
            name: 'Transform8 Gmbh',
            country: 'Germany',
            city: 'Munich',
            zip: 'Zip 123',
            street: 'Street 123',
            mail: 'contact1@company2.com',
            contacts: [
                {
                    contactFirstName: 'Contact 2',
                    contactLastName: 'Last 2',
                    contactMail: 'contact1@company2.com',
                    contactPhoneNumber: '123456789'
                }
            ]
        };

        const companyData3 = {
            name: 'Transform8 Portugal',
            country: 'Portugal',
            city: 'Porto',
            zip: 'Zip 123',
            street: 'Street 123',
            mail: 'contact1@company3.com',
            contacts: [
                {
                    contactFirstName: 'Contact 3',
                    contactLastName: 'Last 3',
                    contactMail: 'contact1@company3.com',
                    contactPhoneNumber: '123456789'
                }
            ]
        };

        const companyResponse1 = await createCompany(companyId1, ...Object.values(companyData1));
        const companyResponse2 = await createCompany(companyId2, ...Object.values(companyData2));
        const companyResponse3 = await createCompany(companyId3, ...Object.values(companyData3));

        console.log('Company creation responses:', companyResponse1, companyResponse2, companyResponse3);

        if (
            companyResponse1 && companyResponse1.acknowledged &&
            companyResponse2 && companyResponse2.acknowledged &&
            companyResponse3 && companyResponse3.acknowledged
        ) {
            console.log('All company responses are valid');
        
            newUser.companies.push(companyResponse1.insertedId, companyResponse2.insertedId, companyResponse3.insertedId);
        
            await newUser.save();
        
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
        
            await Promise.all([
                createContact(companyId1, contactData1),
                createContact(companyId2, contactData2),
                createContact(companyId3, contactData3)
            ]);
        
            console.log('User created successfully');
            return res.send({ "status": true, "message": "User created successfully" });
        } else {
            console.error('Error creating user: Invalid company response structure');
            console.error('Company response 1:', companyResponse1);
            console.error('Company response 2:', companyResponse2);
            console.error('Company response 3:', companyResponse3);
            return res.status(500).send({ "status": false, "message": "Error creating user" });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).send({ "status": false, "message": "Error creating user" });
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
    try {
        var users = await userService.getAllUsers();
        res.send({ "status": true, "message": "User fetched successfully", data: users });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send({ "status": false, "message": "Error getting users" });
    }
}

var deleteUser = async (req, res) => {
    try {
        var status = await userService.removeUser(req.body.email);
        if (status) {
            res.send({ "status": true, "message": "User deleted successfully" });
        } else {
            res.send({ "status": true, "message": "Error deleting user" });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ "status": false, "message": "Error deleting user" });
    }
}

var updateUser = async (req, res) => {
    try {
        const { emailToUpdate, updatedEmail, updatedPassword, updatedData } = req.body;
        var result = await userService.updateUser(emailToUpdate, updatedEmail, updatedPassword, updatedData);

        if (result.success) {
            res.status(result.status).json({ "status": true, "message": "User updated successfully" });
        } else {
            res.status(result.status).json({ "status": false, "message": result.message });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ "status": false, "message": "Internal Server Error" });
    }
};

module.exports = { getAllUsers, deleteUser, updateUser, register, login };
