// Imports
import express from 'express';
import cors from 'cors';
import path from 'path';

// Setup

const app = express();

app.use(cors());
app.use(express.json());

// Routes
import Api from './routes/api';

app.use('/api', Api);

app.get('/assets/index-c7a3871e.js', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../..', 'frontend/dist/assets/index-c7a3871e.js'),
  );
});

app.get('/assets/index-62dad83f.css', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../..', 'frontend/dist/assets/index-62dad83f.css'),
  );
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'frontend/dist/favicon.ico'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'frontend/dist/index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
