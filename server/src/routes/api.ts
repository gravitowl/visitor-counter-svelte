// Imports
import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';

let counter = 0;

if (fs.existsSync('./counter.txt')) {
  counter = Number(fs.readFileSync('./counter.txt', 'utf-8'));
}

// Setup
const router = express.Router();
dotenv.config();

// Routes
router.get('/counter/increment', (req, res) => {
  counter++;
  fs.writeFileSync('./counter.txt', String(counter));
  return res.sendStatus(200);
});

router.get('/counter/get', (req, res) => {
  return res.status(200).json({ res: counter });
});

router.put('/counter/set', (req, res) => {
  const code = req.body.code;

  console.log(req.body);

  if (!Number.isInteger(Number(req.body.newCounter)))
    return res.sendStatus(400);

  if (code == process.env.CODE) {
    counter = req.body.newCounter;
    fs.writeFileSync('./counter.txt', String(counter));
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
});

router.post('/login', (req, res) => {
  const code = req.body.code;

  if (code == process.env.CODE) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
});

export default router;
