// Imports
import express from 'express';
import cors from 'cors';
import path from 'path';

// Setup

const app = express();
app.enable('trust proxy');

app.use(
  cors({
    origin: 'http://127.0.0.1',
  }),
);
app.use(express.json());

// Routes
import Api from './routes/api';

app.use('/api', Api);
app.use(express.static(path.join(__dirname, '../..', 'frontend/dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'frontend/dist', 'index.html'));
});

app.listen(Number(process.env.PORT), '127.0.0.1', () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
