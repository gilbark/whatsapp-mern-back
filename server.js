// Imports
const express = require('express');
const mongoose = require('mongoose');
const messagesRoute = require('./routes/messages');

// App configs
const app = express();
const port = process.env.port || 9000;

// Middlewares

// DB Config
const connection_url =
  'mongodb+srv://gilb:rs1Zf0qCL87pGQLb@cluster0.lpffz.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//

// API routes
// Test route
app.get('/', (req, res, next) => {
  res.status(200).send('Hello world');
});

app.use('/api/v1/messages', messagesRoute);

// Listener
app.listen(port, () => console.log('Listening on port ' + port));
