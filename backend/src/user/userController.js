var userService = require ('./userService')

var getDataControllerfn = async (req, res) => {
    var companies = await userService.getDataFromDBService();
    res.send({ "status": true, "data": company });
}

var createUserControllerFn = async(req, res) => 
{
    var status = await userService.createUserDBService(req.body);
    if(status) {
        res.send({ "status": true, "message": "User created sucessfully"});
    } else {
        res.send ({ "status": true, "message": "Error creating user" })
    }
}

module.exports = { getDataControllerfn, createUserControllerFn}