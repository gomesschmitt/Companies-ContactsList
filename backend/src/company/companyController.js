var companyService = require('../company/companyService')

var postCompany = async (req, res) => {
    var status = await companyService.createCompany(req.body.companyIdNumber, req.body.companyName, req.body.companyCountry, req.body.companyCity, req.body.companyZip, req.body.companyStreet, req.body.companyMail, req.body.companyContacts, req.body.createdBy, req.body.createdOn);
    if (status) {
        res.send({ "status": true, "message": "Company created sucessfully" });
    } else {
        res.send({ "status": true, "message": "Error creating company" })
    }
}

var getAllCompanies = async (req, res) => {
    var company = await companyService.getAllCompanies();
    if (res) {
        res.send({ "status": true, "message": "Companies fetched sucessfully", data: company });
    } else {
        res.send({ "status": true, "message": "Error getting companies" })
    }
}

var deleteCompany = async (req, res) => {
    var status = await companyService.removeCompany(req.body.companyIdNumber);
    if (status) {
        res.send({ "status": true, "message": "Company deleted sucessfully" });
    } else {
        res.send({ "status": true, "message": "Error deleting company" })
    }
}


module.exports = { postCompany, getAllCompanies, deleteCompany }