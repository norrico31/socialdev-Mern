const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: './config/config.env' });
const app = express();

// DB connection
const { ConnectDB } = require('./config/db');
ConnectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[server.js]: running on ${process.env.NODE_ENV} mode on PORT ${PORT}`));