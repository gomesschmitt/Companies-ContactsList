var companyRepository = require('../company/companyRepository')

const createCompany = async (companyIdNumber, companyName, companyCountry, companyCity, companyZip, companyStreet, companyMail, companyContacts, createdBy, createdOn) => {
    const response = await companyRepository.insertCompany(companyIdNumber, companyName, companyCountry, companyCity, companyZip, companyStreet, companyMail, companyContacts, createdBy, createdOn)
    return response
}

const getAllCompanies = async () => {
    const response = await companyRepository.getAllCompanies()
    return response
}

const removeCompany = async (companyIdNumber) => {
    const response = await companyRepository.deleteCompany(companyIdNumber)
    return response
}

const updateCompany = async (companyId, updatedFields) => {
    const response = await companyRepository.updateCompany(companyId, updatedFields);
    return response;
};

module.exports = { createCompany, getAllCompanies, removeCompany, updateCompany }