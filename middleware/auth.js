const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	// get token from headers
	const token = req.header('x-auth-token');
	// check if not token
	if (!token) {
		return res.status(400).json({ msg: 'No token, authorizationn denied' });
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		// set user
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
