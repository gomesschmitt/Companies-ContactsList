const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyIdNumber: {
        type: String,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyCountry: {
        type: String
    },
    companyCity: {
        type: String
    },
    companyZip: {
        type: String
    },
    companyStreet: {
        type: String
    },
    companyMail: {
        type: String
    },
    companyContacts: {
        type: Array
    },
    createdBy: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
