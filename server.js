const express = require('express');
const { ConnectDB } = require('./config/db.js');
const app = express();

// Connect database
ConnectDB();

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`[server.js]: running on PORT ${PORT}`));