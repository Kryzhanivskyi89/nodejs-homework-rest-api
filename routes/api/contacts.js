const express = require('express');

const router = express.Router();

const contactsControllers = require('../../controllers/contacts');

const { isValidId, authenticate } = require('../../middlewares');

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../decorators");

router.use("/", authenticate);

router.get('/', contactsControllers.getAllContacts);

router.get('/:contactId', isValidId, contactsControllers.getContactById);

router.post('/', validateBody(schemas.contactsAddSchema), contactsControllers.addContact);

router.delete('/:contactId', isValidId, contactsControllers.deleteContactById);

router.put('/:contactId', isValidId, validateBody(schemas.contactsUpdate), contactsControllers.updateContactById);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.contactsUpdateFavotite), contactsControllers.updateStatusContact);

module.exports = router;