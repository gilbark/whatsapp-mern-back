// Imports
const express = require('express');

// App configs
const app = express();
const port = process.env.port || 9000;

// Middlewares

// DB Config

//

// API routes
app.get('/', (req, res, next) => {
  res.status(200).send('Hello world');
});

// Listener
app.listen(port, () => console.log('Listening on port ' + port));
