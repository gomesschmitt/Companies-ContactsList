const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    contactIdNumber: {
        type: String,
        required: true,
        unique: true
    },
    contactMail: {
        type: String,
        required: true
    },
    contactFirstName: {
        type: String,
        required: true
    },
    contactLastName: {
        type: String,
        required: true
    },
    contactPhoneNumber: {
        type: String
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema, 'contact');

module.exports = Contact;
