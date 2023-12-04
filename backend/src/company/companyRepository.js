const client = require('../../db');

const myDB = client.db("RobertoChallenge"); 
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

module.exports = { insertCompany, getAllCompanies, deleteCompany }