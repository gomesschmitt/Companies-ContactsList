var userRepository = require('../user/userRepository')

const createUser = async (email, firstName, lastName, password, birthDay, iban) => {
    const response = await userRepository.insertUser(email, firstName, lastName, password, birthDay, iban)
    return response
}

const getAllUsers = async () => {
    const response = await userRepository.getAllUsers()
    return response
}

const removeUser = async (email) => {
    const response = await userRepository.deleteUser(email)
    return response
}

module.exports = { createUser, getAllUsers, removeUser }