const express = require('express');
const router = express.Router();
const userController = require('../src/user/userController');
const companyController = require('../src/company/companyController');
const contactController = require('../src/contact/contactController');
const { adminAuth, userAuth } = require('../src/middleware/authMiddleware');


// User Routes
router.route('/user/getAll').get(userController.getAllUsers);

router.route('/user').delete(userController.deleteUser);

router.route('/register').post(userController.register);

router.route('/login').post(userController.login);

router.route('/user/edit').patch(userController.updateUser);

// Company Routes
router.route('/companies/getAll').get(companyController.getAllCompanies);

router.route('/company').post(companyController.postCompany);

router.route('/company').delete(companyController.deleteCompany);

router.route('/company/edit/:id').patch(companyController.updateCompany);

// Contact Routes
router.route('/contacts/getAll').get(contactController.getAllContacts);

router.route('/contact').post(contactController.postContact);

router.route('/contact').delete(contactController.deleteContact);

router.route('/contact/edit/:id').patch(contactController.updateContact);

module.exports = router;
