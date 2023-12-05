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

const updateUser = async (emailToUpdate, updatedEmail, updatedPassword, updatedData) => {
    try {
        const user = await userRepository.getUserByEmail(emailToUpdate);

        if (!user) {
            return { success: false, status: 404, message: 'User not found. Cannot update.' };
        }

        const result = await userRepository.updateUser(emailToUpdate, updatedEmail, updatedPassword, updatedData);

        if (!result.success) {
            return { success: false, status: 500, message: 'Error updating user.' };
        }

        return { success: true, status: 200, message: 'User updated successfully' };
    } catch (error) {
        console.error('Error updating user:', error);
        return { success: false, status: 500, message: error.message || 'Error updating user' };
    }
};

module.exports = { createUser, getAllUsers, removeUser, updateUser };
