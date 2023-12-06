const client = require('../../db');

const myDB = client.db("RobertoChallenge"); 
const myColl = myDB.collection("users"); 

const getAllUsers = async () => {
  const result = await myColl.find({}).toArray();;
  return result
}

const deleteUser = async (emailToDelete) => {
  const result = await myColl.deleteOne({ email: emailToDelete })
  return result
}

const updateUser = async (emailToUpdate, updatedEmail, updatedPassword, updatedData) => {
  const user = await myColl.findOne({ email: emailToUpdate });

  if (!user) {
      return { success: false, message: 'User not found. Cannot update.' };
  }

  const result = await myColl.updateOne(
      { email: emailToUpdate },
      { $set: { email: updatedEmail, userPassword: updatedPassword, ...updatedData } }
  );

  return { success: result.modifiedCount > 0, modifiedCount: result.modifiedCount };
}

const getUserByEmail = async (email) => {
  const user = await myColl.findOne({ email: email });
  return user;
}

module.exports = {  getAllUsers, deleteUser, updateUser, getUserByEmail }