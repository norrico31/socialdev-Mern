const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

exports.ConnectDB = async () => {
    try {
        await mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(error.message);

        // Exit process with failure
        process.exit(1);
    }
}