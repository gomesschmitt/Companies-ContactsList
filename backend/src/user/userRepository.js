const client = require('../../db');

const myDB = client.db("RobertoChallenge"); 
const myColl = myDB.collection("users"); 

const insertUser = async (email, userFirstName, userLastName, userPassword, userBirthDay, userIban) => {
    const user = { 
        email: email, 
        userFirstName: userFirstName, 
        userLastName: userLastName, 
        userPassword: userPassword, 
        userBirthDay: userBirthDay, 
        userIban: userIban 
    };
    const result = await myColl.insertOne(user);
    return result;
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