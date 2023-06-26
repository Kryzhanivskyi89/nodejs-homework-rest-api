const Contact = require("../../models/contacts");

const { HttpError } = require('../../helpers');

const updateContactById = async (req, res) => {
  const { contactId } = req.params;

  if (!contactId || Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  
  const contactByID = await Contact.findByIdAndUpdate( contactId, req.body, { new: true });
  
  if (!contactByID) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(contactByID);
};

module.exports = updateContactById;