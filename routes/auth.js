const express = require('express');
const User = require('../models/Users');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

// @route GET api/auth
// @desc Get Loged in user
// @access Private
router.get('/', (req, res) => {
	res.send('Get logged in user');
});

// @route POST api/auth
// @desc Login User
// @access Public
router.post(
	'/',
	[
		check('email', 'Please include email ').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			// check password
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				res.status(400).json({ msg: 'Invalid Credentials' });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
