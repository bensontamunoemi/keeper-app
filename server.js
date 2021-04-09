const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
