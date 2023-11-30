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

  const userExists = await myDB.collection("users").findOne({ email: createdBy });
  if (!userExists) {
    throw new Error(`Usuário não encontrado para o e-mail: ${createdBy}`);
    // o email do user, depois vai ser usado para criação de empresa e tem de ser o mesmo email quando foi criada o user, caso contrario da erro
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