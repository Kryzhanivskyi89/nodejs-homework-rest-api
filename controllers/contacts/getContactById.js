const { Contact } = require('../../models');

const { HttpError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactByID = await Contact.findById(contactId);
  if (!contactByID) {
    throw HttpError(404);
  }
  res.json(contactByID);
};

module.exports = getContactById;