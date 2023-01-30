// Imports
import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

let counter = 0;

if (fs.existsSync('./counter.txt')) {
  counter = Number(fs.readFileSync('./counter.txt', 'utf-8'));
}

// Setup
const router = express.Router();
dotenv.config();

// const loginLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 15,
//   standardHeaders: true,
// });

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: 'Too many requests, please try again later',
  headers: true,
  keyGenerator: function (req) {
    return (req.headers['x-forwarded-for'] || req.ip) as string;
  },
});

const incrementLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1,
  message: 'Too many requests, please try again later',
  headers: true,
  keyGenerator: function (req) {
    return (req.headers['x-forwarded-for'] || req.ip) as string;
  },
});

// const incrementLimiter = rateLimit({
//   windowMs: 24 * 60 * 60 * 1000,
//   max: 1,
//   standardHeaders: true,
// });

// Routes
router.get('/counter/increment', incrementLimiter, (req, res) => {
  counter++;
  fs.writeFileSync('./counter.txt', String(counter));
  return res.sendStatus(200);
});

router.get('/counter/get', (req, res) => {
  return res.status(200).json({ res: counter });
});

router.put('/counter/set', (req, res) => {
  const code = req.body.code;

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

router.post('/login', loginLimiter, (req, res) => {
  const code = req.body.code;

  if (code == process.env.CODE) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
});

export default router;
