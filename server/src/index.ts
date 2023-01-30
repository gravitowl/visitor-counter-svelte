// Imports
import express from 'express';
import cors from 'cors';
import path from 'path';

// Setup

const app = express();
app.set('trust proxy', 2);

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'frontend/dist', 'index.html'));
});

app.get('/ip', (request, response) => response.send(request.ip));

app.listen(Number(process.env.PORT), '127.0.0.1', () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
