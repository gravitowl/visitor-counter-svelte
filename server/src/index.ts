// Imports
import express from 'express';
import cors from 'cors';
import path from 'path';

// Setup

const app = express();

app.use(
  cors({
    origin: 'http://mentaalachtergesteld.nl',
  }),
);
app.use(express.json());

// Routes
import Api from './routes/api';

app.use('/api', Api);

app.get('/assets/:file', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../..', 'frontend/dist/assets', req.params.file),
  );
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'frontend/dist/index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
