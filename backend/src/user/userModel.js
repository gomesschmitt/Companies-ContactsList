const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    companies: [{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }],
    email: {
        type: String,
        required: true,
        unique: true
    },
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userBirthDay: {
        type: Date
    },
    userIban: {
        type: String
    },
    role: {
        type: String,
        default: "user",
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
