"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// Setup
const app = (0, express_1.default)();
app.enable('trust proxy');
app.use((0, cors_1.default)({
    origin: 'http://127.0.0.1',
}));
app.use(express_1.default.json());
// Routes
const api_1 = __importDefault(require("./routes/api"));
app.use('/api', api_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../..', 'frontend/dist')));
app.get('/ip', (req, res) => {
    console.log(req.headers);
    return res.send(req.headers['x-forwarded-for']);
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../..', 'frontend/dist', 'index.html'));
});
app.listen(Number(process.env.PORT), '127.0.0.1', () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});
