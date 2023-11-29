var userService = require('../user/userService')

var postUser = async(req, res) => 
{
    var status = await userService.createUser(req.body.email, req.body.firstName, req.body.lastName, req.body.password, req.body.birthDay, req.body.iban);
    if(status) {
        res.send({ "status": true, "message": "User created sucessfully"});
    } else {
        res.send ({ "status": true, "message": "Error creating user" })
    }
}

var getAllUsers = async(req, res) => 
{
    var users = await userService.getAllUsers();
    if(res) {
        res.send({ "status": true, "message": "User fetched sucessfully", data: users} );
    } else {
        res.send ({ "status": true, "message": "Error getting user" })
    }
}

var deleteUser = async(req, res) => 
{
    var status = await userService.removeUser(req.body.email);
    if(status) {
        res.send({ "status": true, "message": "User deleted sucessfully"} );
    } else {
        res.send ({ "status": true, "message": "Error deleting user" })
    }
}


module.exports = { postUser, getAllUsers, deleteUser}