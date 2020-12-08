// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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
app.use(cors());

// DB Config
const connection_url =
  'mongodb+srv://gilb:rs1Zf0qCL87pGQLb@cluster0.lpffz.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('DB Connected successfully');

  const msgCollection = db.collection('messagecontents');
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.log('Error triggering pusher');
    }
  });
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
