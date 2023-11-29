const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  const myDB = client.db("RobertoChallenge"); // aceder a base de dados chamada "RobertoChallenge"
  const myColl = myDB.collection("companies"); // aceder a coleção dentro da base de dados "RobertoChallenge" que se chama "companies"

const insertCompany = async (companyId, companyName, companyCountry, companyCity, companyZip, companyStreet, companyMail, companyContacts, createdBy, createdOn) => {
    const company = {companyIdNumber: companyId, companyName: companyName, companyCountry: companyCountry, companyCity: companyCity, companyZip: companyZip, companyStreet: companyStreet, companyMail: companyMail, companyContacts: companyContacts, createdBy: createdBy, createdOn: createdOn};
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

module.exports = {insertCompany, getAllCompanies, deleteCompany }