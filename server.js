const express = require('express');
const configDB = require('./config/database.js');
const cors = require('cors');
const router = require('./config/routes.js');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
const port = process.env.PORT || 3030;
dotenv.config();
configDB();

app.use(express.json());
app.use(cors());

app.use('/api/', router);

//* Handles any requests that don't match the ones above
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/quiz_client/build/index.html'));
});

//* Handles any requests that don't match the ones above
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/quiz_client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port} `);
});
