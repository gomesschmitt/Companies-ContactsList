var express = require('express');

const router = express.Router();
var userController = require('../src/user/userController')
var companyController = require('../src/company/companyController')

// User Routes

router.route('/user/getAll').get(userController.getAllUsers);

router.route('/user').post(userController.postUser);

router.route('/user').delete(userController.deleteUser);

// Company Routes

router.route('/companies/getAll').get(companyController.getAllCompanies);

router.route('/company').post(companyController.postCompany);

router.route('/company').delete(companyController.deleteCompany);

module.exports = router;