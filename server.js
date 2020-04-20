const express = require('express');
const { ConnectDB } = require('./config/db.js');
const app = express();

// Connect database
ConnectDB();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`[server.js]: running on PORT ${PORT}`));