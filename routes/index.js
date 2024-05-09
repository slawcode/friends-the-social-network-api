const router = require('express').Router();
const apiRoutes = require('./api'); // Import all api routes from /api/index.js

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;