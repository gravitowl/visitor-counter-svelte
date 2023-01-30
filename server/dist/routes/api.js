"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
let counter = 0;
if (fs_1.default.existsSync('./counter.txt')) {
    counter = Number(fs_1.default.readFileSync('./counter.txt', 'utf-8'));
}
// Setup
const router = express_1.default.Router();
dotenv_1.default.config();
// const loginLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 15,
//   standardHeaders: true,
// });
const loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 15,
    message: 'Too many requests, please try again later',
    headers: true,
    keyGenerator: function (req) {
        return (req.headers['x-forwarded-for'] || req.ip);
    },
});
const incrementLimiter = (0, express_rate_limit_1.default)({
    windowMs: 24 * 60 * 60 * 1000,
    max: 1,
    message: 'Too many requests, please try again later',
    headers: true,
    keyGenerator: function (req) {
        return (req.headers['x-forwarded-for'] || req.ip);
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
    fs_1.default.writeFileSync('./counter.txt', String(counter));
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
        fs_1.default.writeFileSync('./counter.txt', String(counter));
        return res.sendStatus(200);
    }
    else {
        return res.sendStatus(401);
    }
});
router.post('/login', loginLimiter, (req, res) => {
    const code = req.body.code;
    if (code == process.env.CODE) {
        return res.sendStatus(200);
    }
    else {
        return res.sendStatus(401);
    }
});
exports.default = router;
