// Importing mongoose library
const { connect, connection } = require('mongoose');

// Connection string to local instance of MongoDB
const connectionString = 'mongodb://127.0.0.1:27017/friendsDB';

connect(connectionString, {
    userNewUrlParser: true, // Use new driver's connection string parser 
    userUnifiedTopology: true, // Enable new unified topology layer 
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB!', err));

// Exporting the connection to the database as a module
module.exports = connection;