var contactService = require('../contact/contactService')

var postContact = async (req, res) => {
    var status = await contactService.createContact(req.body.contactId, req.body.contactMail, req.body.contactFirstName, req.body.contactLastName, req.body.contactPhoneNumber, req.body.companyId);
    if (status) {
        res.send({ "status": true, "message": "Contact created sucessfully" });
    } else {
        res.send({ "status": true, "message": "Error creating contact" })
    }
}

var getAllContacts = async (req, res) => {
    var contacts = await contactService.getAllContacts();
    if (res) {
        res.send({ "status": true, "message": "Contacts fetched sucessfully", data: contacts });
    } else {
        res.send({ "status": true, "message": "Error getting contacts" })
    }
}

var deleteContact = async (req, res) => {
    var status = await contactService.removeContact(req.body.contactIdNumber);
    if (status) {
        res.send({ "status": true, "message": "Contact deleted sucessfully" });
    } else {
        res.send({ "status": true, "message": "Error deleting contact" })
    }
}

var updateContact = async (req, res) => {
    try {
        const status = await contactService.updateContact(req.body.contactIdNumber, req.body);
        if (status) {
            res.send({ "status": true, "message": "Contact updated successfully" });
        } else {
            res.send({ "status": false, "message": "Error updating contact" });
        }
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
}

module.exports = { postContact, getAllContacts, deleteContact, updateContact }