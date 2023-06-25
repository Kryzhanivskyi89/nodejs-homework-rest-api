const Contact = require("../../models/contacts");

const { HttpError } = require('../../helpers');

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  
  if (!contactId || Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields favorite");
  }
  
  const contactByID = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!contactByID) {
    throw HttpError(404);
  }
  res.json(contactByID);
};

module.exports = updateStatusContact;