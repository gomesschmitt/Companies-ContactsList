var contactRepository = require('../contact/contactRepository')

const createContact = async (contactIdNumber, contactMail, contactFirstName, contactLastName, contactPhoneNumber, companyId) => {
    const response = await contactRepository.insertContact(contactIdNumber, contactMail, contactFirstName, contactLastName, contactPhoneNumber, companyId)
    return response
}

const createContacts = async (userEmail, companyId, contactData) => {
    try {
        const response = await contactRepository.insertContact(
            contactData.contactIdNumber,
            contactData.contactMail,
            contactData.contactFirstName,
            contactData.contactLastName,
            contactData.contactPhoneNumber,
            companyId
        );

        return response;
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
};

const getAllContacts = async () => {
    const response = await contactRepository.getAllContacts()
    return response
}

const removeContact = async (contactIdNumber) => {
    const response = await contactRepository.deleteContact(contactIdNumber)
    return response
}

const updateContact = async (contactId, updatedFields) => {
    console.log("Updating contact with ID:", contactId);
    console.log("Updated fields:", updatedFields);

    const response = await contactRepository.updateContact(contactId, updatedFields);
    console.log("Update response:", response);

    return response;
};

module.exports = { createContact, getAllContacts, removeContact, updateContact, createContacts }