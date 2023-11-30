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
const myColl = myDB.collection("users"); // aceder a coleção dentro da base de dados "RobertoChallenge" que se chama "companies"

const insertUser = async (email, userFirstName, userLastName, userPassword, userBirthDay, userIban) => {
  const user = { 
    email: email, 
    firstName: userFirstName, 
    lastName: userLastName, 
    password: userPassword, 
    birthDay: userBirthDay, 
    iban: userIban 
  };
  const result = await myColl.insertOne(user);
  return result
}

const getAllUsers = async () => {
  const result = await myColl.find({}).toArray();;
  return result
}

const deleteUser = async (emailToDelete) => {
  const result = await myColl.deleteOne({ email: emailToDelete })
  return result
}

module.exports = { insertUser, getAllUsers, deleteUser }