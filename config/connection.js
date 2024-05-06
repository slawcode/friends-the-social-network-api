// Importing mongoose library
const { connect, connection } = require('mongoose');

// Connection string to local instance of MongoDB
const connectionString = 'mongodb://127.0.0.1:27017/friendsDB';

connect(connectionString);

// Exporting the connection to the database as a module
module.exports = connection;