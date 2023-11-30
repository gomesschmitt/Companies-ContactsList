const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const myDB = client.db("RobertoChallenge");
const myColl = myDB.collection("contact");

const insertContact = async (contactId, contactMail, contactFirstName, contactLastName, contactPhoneNumber, companyId) => {
  // Verifica se a empresa com o companyId existe
  const companyExists = await myDB.collection("companies").findOne({ companyIdNumber: companyId });
  if (!companyExists) {
    throw new Error(`Empresa não encontrada para o companyId: ${companyId}`);
  }
  // O companyIDNumber "companyID" vai ser usado para depois criar um novo contacto, caso nao haja um companyID da um erro 

  const contactInUse = await myDB.collection("companies").findOne({ companyContacts: contactId });
  if (contactInUse) {
    throw new Error(`O contactId ${contactId} já está associado a outra empresa.`);
  }
  // O CompanyContacts não pode ser o mesmo que o contactId , caso contrario retorna erro
  const contact = {
    contactIdNumber: contactId,
    contactMail: contactMail,
    contactFirstName: contactFirstName,
    contactLastName: contactLastName,
    contactPhoneNumber: contactPhoneNumber,
    companyId: companyId // Referência para a empresa
  };

  const result = await myColl.insertOne(contact);
  return result;
}

const getAllContacts = async () => {
  const result = await myColl.find({}).toArray();
  return result;
}

const deleteContact = async (contactIdDelete) => {
  const result = await myColl.deleteOne({ contactIdNumber: contactIdDelete })
  return result;
}

module.exports = { insertContact, getAllContacts, deleteContact };
