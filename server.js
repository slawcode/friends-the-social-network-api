// Import requires dependencies 
// const express = require('express'); // Import Express.JS
// const db = require('./config/connection');
// const routes = require('./routes');

// // const cwd = process.cwd();

// // Middleware to parse incoming data
// const PORT = 3001;
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

// // Connent to database
// db.once('once', () => {
//     app.listen(PORT, () => {
//         console.log(`API server running on port ${PORT}!`);
//     });
// });

const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
