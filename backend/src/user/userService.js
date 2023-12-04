const userRepository = require('../user/userRepository');
const bcrypt = require('bcryptjs');

const createUser = async (email, userFirstName, userLastName, userPassword, userBirthDay, userIban) => {
    try {
        if (!userPassword) {
            throw new Error('Password is required.');
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const response = await userRepository.insertUser(email, userFirstName, userLastName, hashedPassword, userBirthDay, userIban);
        return response;
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Error creating user' };
    }
};

const getAllUsers = async () => {
    const response = await userRepository.getAllUsers();
    return response;
};

const removeUser = async (email) => {
    const response = await userRepository.deleteUser(email);
    return response;
};

module.exports = { createUser, getAllUsers, removeUser };
