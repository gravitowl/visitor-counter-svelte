// Imports
import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';

// Setup

const app = express();
// const options = {
//   cert: fs.readFileSync(path.join(__dirname, '..', 'sslcert/fullchain.pem')),
//   key: fs.readFileSync(path.join(__dirname, '..', 'sslcert/privkey.pem')),
// };

app.use(
  cors({
    origin: 'http://mentaalachtergesteld.nl',
  }),
);
app.use(express.json());
app.use(helmet());
// app.use(express.static(path.join(__dirname, '../..', 'frontend/dist')));

// Routes
import Api from './routes/api';

app.use('/api', Api);

app.get('/assets/:file', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../..', 'frontend/dist/assets', req.params.file),
  );
});

app.get('/.well-known/acme-challenge/:file', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      '../..',
      'frontend/dist/.well-known/acme-challenge/',
      req.params.file,
    ),
  );
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'frontend/dist/index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});

// https.createServer(options, app).listen(8443);
