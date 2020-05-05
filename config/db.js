const mongoose = require('mongoose');

exports.ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);

        // Exit process with failure
        process.exit(1);
    }
}