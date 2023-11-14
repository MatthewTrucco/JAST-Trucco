const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up the path to the static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Middleware for parsing application/x-www-form-urlencoded and application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If you have routes defined in ./routes/htmlRoutes, they will be used here
require('./routes/htmlRoutes')(app);

// Start the server
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
