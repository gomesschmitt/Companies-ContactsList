var contactRepository = require('../contact/contactRepository')

const createContact = async (contactIdNumber, contactMail, contactFirstName, contactLastName, contactPhoneNumber, companyId) => {
    const response = await contactRepository.insertContact(contactIdNumber, contactMail, contactFirstName, contactLastName, contactPhoneNumber, companyId)
    return response
}

const getAllContacts = async () => {
    const response = await contactRepository.getAllContacts()
    return response
}

const removeContact = async (contactIdNumber) => {
    const response = await contactRepository.deleteContact(contactIdNumber)
    return response
}

module.exports = { createContact, getAllContacts, removeContact }