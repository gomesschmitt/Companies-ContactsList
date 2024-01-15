const express = require('express');

const router = express.Router();
let userController = require('../src/user/userController');
let companyController = require('../src/company/companyController');
let contactController = require('../src/contact/contactController');


// User Routes

router.route('/user/getAll').get(userController.getAllUsers); // only admin

router.route('/user').delete(userController.deleteUser);

router.route('/register').post(userController.register);

router.route('/login').post(userController.login);

router.route('/user/edit').patch(userController.updateUser);

// Company Routes

router.route('/companies/getAll').get(companyController.getAllCompanies); // only admin

router.route('/company').post(companyController.postCompany);

router.route('/company').delete(companyController.deleteCompany); // only admin

router.route('/company/edit/:id').patch(companyController.updateCompany)

// Contact Routes

router.route('/contacts/getAll').get(contactController.getAllContacts); // only admin

router.route('/contact').post(contactController.postContact);

router.route('/contact').delete(contactController.deleteContact); // only admin

router.route('/contact/edit/:id').patch(contactController.updateContact);

module.exports = router;