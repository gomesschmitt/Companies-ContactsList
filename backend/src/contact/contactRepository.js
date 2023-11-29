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
  const myColl = myDB.collection("contact"); // aceder a coleção dentro da base de dados "RobertoChallenge" que se chama "companies"

const insertContact = async (contactId, contactMail, contactFirstName, contactLastName, contactPhoneNumber, companyId) => {
    const contact = {contactIdNumber: contactId, contactMail: contactMail, contactFirstName: contactFirstName, contactLastName: contactLastName, contactPhoneNumber: contactPhoneNumber, companyId: companyId};
    const result = await myColl.insertOne(contact);
    return result
}

const getAllContacts = async () => {
    const result = await myColl.find({}).toArray();;
    return result
}

const deleteContact = async (contactIdDelete) => {
    const result = await myColl.deleteOne({ contactIdNumber: contactIdDelete })
    return result
}

module.exports = {insertContact, getAllContacts, deleteContact }