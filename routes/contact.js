const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/auth');
const User = require('../models/Users');
const Contact = require('../models/Contacts');
const { check, validationResult } = require('express-validator');

// @route GET api/contacts
// @desc Get all users contacts
// @access Private
router.get('/', authCheck, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route POST api/contacts
// @desc add new contact
// @access Private
router.post('/', (req, res) => {
	res.send('Add new contact');
});

// @route PUT api/contacts/:id
// @desc update a contact
// @access Private
router.put('/:id', (req, res) => {
	res.send('Update  contact');
});

// @route DELETE api/contacts/:id
// @desc Delete a contact
// @access Private
router.delete('/:id', (req, res) => {
	res.send('Delete  contact');
});
module.exports = router;
