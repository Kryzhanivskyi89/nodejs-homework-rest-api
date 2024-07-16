const Contact = require("../../models/contacts");

const { HttpError } = require('../../helpers');

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactByID = await Contact.findByIdAndRemove(contactId);
  if (!contactByID) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(contactByID);
};

module.exports = deleteContactById;