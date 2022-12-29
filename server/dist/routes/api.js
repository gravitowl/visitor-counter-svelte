"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
let counter = 0;
if (fs_1.default.existsSync('./counter.txt')) {
    counter = Number(fs_1.default.readFileSync('./counter.txt', 'utf-8'));
}
// Setup
const router = express_1.default.Router();
dotenv_1.default.config();
// Routes
router.get('/counter/increment', (req, res) => {
    counter++;
    fs_1.default.writeFileSync('./counter.txt', String(counter));
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
        fs_1.default.writeFileSync('./counter.txt', String(counter));
        return res.sendStatus(200);
    }
    else {
        return res.sendStatus(401);
    }
});
router.post('/login', (req, res) => {
    const code = req.body.code;
    if (code == process.env.CODE) {
        return res.sendStatus(200);
    }
    else {
        return res.sendStatus(401);
    }
});
exports.default = router;
