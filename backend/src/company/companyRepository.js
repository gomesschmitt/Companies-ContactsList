const client = require('../../db');
//const myDB = client.db("RobertoChallenge"); 
//const myColl = myDB.collection("companies"); 

const myDB = client.db("test"); 
const myColl = myDB.collection("companies"); 

const insertCompany = async (companyId, companyName, companyCountry, companyCity, companyZip, companyStreet, companyMail, companyContacts, createdBy, createdOn) => {

  const userExists = await myDB.collection("users").findOne({ email: createdBy });
  if (!userExists) {
    throw new Error(`User wasn't found for the email: ${createdBy}`);
    // the user email, afterwards will be used to create a company and has to have the same email than the used has when created, otherwise gives error
  }

  const company = {
    companyIdNumber: companyId,
    companyName: companyName,
    companyCountry: companyCountry,
    companyCity: companyCity,
    companyZip: companyZip,
    companyStreet: companyStreet,
    companyMail: companyMail,
    companyContacts: companyContacts,
    createdBy: createdBy,
    createdOn: createdOn
  };
  const result = await myColl.insertOne(company);
  return result
}

const getAllCompanies = async () => {
  const result = await myColl.find({}).toArray();;
  return result
}

const deleteCompany = async (companyIdDelete) => {
  const result = await myColl.deleteOne({ companyIdNumber: companyIdDelete })
  return result
}

const updateCompany = async (companyId, updatedFields) => {
  const existingCompany = await myColl.findOne({ companyIdNumber: companyId });
  if (!existingCompany) {
    throw new Error(`Company not found with the companyId: ${companyId}`);
  }

  const allowedFields = ['companyName', 'companyCountry', 'companyCity', 'companyZip', 'companyStreet', 'companyMail', 'companyContacts'];
  const updateData = {};
  for (const field of allowedFields) {
    if (updatedFields[field] !== undefined) {
      updateData[field] = updatedFields[field];
    }
  }

  const result = await myColl.updateOne({ companyIdNumber: companyId }, { $set: updateData });

  if (result.modifiedCount > 0) {
    return { status: true, message: 'Company updated successfully' };
  } else {
    return { status: false, message: 'No changes detected. Company may not have been updated.' };
  }
}

module.exports = { insertCompany, getAllCompanies, deleteCompany, updateCompany }