"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
// Setup
const app = (0, express_1.default)();
const options = {
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'sslcert/fullchain.pem')),
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'sslcert/privkey.pem')),
};
app.use((0, cors_1.default)({
    origin: 'http://mentaalachtergesteld.nl',
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
// app.use(express.static(path.join(__dirname, '../..', 'frontend/dist')));
// Routes
const api_1 = __importDefault(require("./routes/api"));
app.use('/api', api_1.default);
app.get('/assets/:file', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../..', 'frontend/dist/assets', req.params.file));
});
app.get('/.well-known/acme-challenge/:file', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../..', 'frontend/dist/.well-known/acme-challenge/', req.params.file));
});
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../..', 'frontend/dist/index.html'));
});
app.listen(8080, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});
https_1.default.createServer(options, app).listen(8443);
