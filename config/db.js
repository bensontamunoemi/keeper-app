const config = require('config');
const mongoose = require('mongoose');

const db = config.get('mongoURI');

const connectDB = {};
