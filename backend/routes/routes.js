var express = require('express');

const router = express.Router();
var userController = require('../src/user/userController')

router.route('/user/getAll').get(userController.getAllUsers);

router.route('/user').post(userController.postUser);

router.route('/user').delete(userController.deleteUser);

module.exports = router;