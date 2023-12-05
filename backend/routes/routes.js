var express = require('express');

const router = express.Router();
var userController = require('../src/user/userController');
var companyController = require('../src/company/companyController');
var contactController = require('../src/contact/contactController')
var userController = require('../src/user/userController');

// User Routes

router.route('/user/getAll').get(userController.getAllUsers);

router.route('/user').post(userController.postUser);

router.route('/user').delete(userController.deleteUser);

router.route('/register').post(userController.register);

router.route('/login').post(userController.login);

router.route('/user/edit').patch(userController.updateUser)

// Company Routes

router.route('/companies/getAll').get(companyController.getAllCompanies);

router.route('/company').post(companyController.postCompany);

router.route('/company').delete(companyController.deleteCompany);

// Contact Routes

router.route('/contacts/getAll').get(contactController.getAllContacts);

router.route('/contact').post(contactController.postContact);

router.route('/contact').delete(contactController.deleteContact);

module.exports = router;