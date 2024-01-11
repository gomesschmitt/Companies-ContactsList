const client = require('../../db');

const myDB = client.db("RobertoChallenge"); 
const myColl = myDB.collection("contact"); 


const insertContact = async (contactId, contactMail, contactFirstName, contactLastName, contactPhoneNumber, companyId) => {
  // Check's if the companyId exists
  const companyExists = await myDB.collection("companies").findOne({ companyIdNumber: companyId });
  if (!companyExists) {
    throw new Error(`Company not found with the companyId: ${companyId}`);
  }
  //The "companyID" will be used to create a new contact, if there is no companyID it gives an error

  const contactInUse = await myDB.collection("companies").findOne({ companyContacts: contactId });
  if (contactInUse) {
    throw new Error(`The contact ${contactId} is already in use.`);
  }
  const contact = {
    contactIdNumber: contactId,
    contactMail: contactMail,
    contactFirstName: contactFirstName,
    contactLastName: contactLastName,
    contactPhoneNumber: contactPhoneNumber,
    companyId: companyId 
  };

  const result = await myColl.insertOne(contact);
  return result;
}

const updateContact = async (contactId, updatedFields) => {
  const existingContact = await myColl.findOne({ contactIdNumber: contactId });
  if (!existingContact) {
    throw new Error(`Contact not found with the contactId: ${contactId}`);
  }

  const allowedFields = ['contactMail', 'contactFirstName', 'contactLastName', 'contactPhoneNumber'];
  const updateData = {};
  for (const field of allowedFields) {
    if (updatedFields[field] !== undefined) {
      updateData[field] = updatedFields[field];
    }
  }

  const result = await myColl.updateOne({ contactIdNumber: contactId }, { $set: updateData });

  if (result.modifiedCount > 0) {
    return { status: true, message: 'Contact updated successfully' };
  } else {
    return { status: false, message: 'No changes detected. Contact may not have been updated.' };
  }
}

const getAllContacts = async () => {
  const result = await myColl.find({}).toArray();
  return result;
}

const deleteContact = async (contactIdDelete) => {
  const result = await myColl.deleteOne({ contactIdNumber: contactIdDelete })
  return result;
}

module.exports = { insertContact, getAllContacts, deleteContact, updateContact };
