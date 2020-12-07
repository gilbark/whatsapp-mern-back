// Imports
const express = require('express');
const mongoose = require('mongoose');
const messagesRoute = require('./routes/messages');
const Pusher = require('pusher');

// App configs
const app = express();
const port = process.env.port || 9000;

const pusher = new Pusher({
  appId: '1119315',
  key: 'aa0f301a21b25380fc83',
  secret: '14208f965281d345d8a3',
  cluster: 'eu',
  useTLS: true,
});

// Middlewares
// Res as JSON
app.use(express.json());

// DB Config
const connection_url =
  'mongodb+srv://gilb:rs1Zf0qCL87pGQLb@cluster0.lpffz.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API routes
// --Test route
app.get('/', (req, res, next) => {
  res.status(200).send('Hello world');
});

// --Messages route
app.use('/messages', messagesRoute);

// Listener
app.listen(port, () => console.log('Listening on port ' + port));
