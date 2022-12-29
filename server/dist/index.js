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
app.use((0, cors_1.default)({
    origin: 'https://mentaalachtergesteld.nl',
}));
app.use(express_1.default.json());
// Routes
const api_1 = __importDefault(require("./routes/api"));
app.use('/api', api_1.default);
app.get('/assets/index-c7a3871e.js', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../..', 'frontend/dist/assets/index-c7a3871e.js'));
});
app.get('/assets/:file', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../..', 'frontend/dist/assets', req.params.file));
});
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../..', 'frontend/dist/favicon.ico'));
});
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../..', 'frontend/dist/index.html'));
});
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});
