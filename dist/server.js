"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const venom = require('venom-bot');
const routes_1 = __importDefault(require("./routes/routes"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use(routes_1.default);
venom
    .create('sessionName', (base64Qrimg, asciiQR, attempts, urlCode) => {
    console.log('Number of attempts to read the qrcode: ', attempts);
    console.log('Terminal qrcode: ', asciiQR);
    console.log('base64 image string qrcode: ', base64Qrimg);
    console.log('urlCode (data-ref): ', urlCode);
}, (statusSession, session) => {
    console.log('Status Session: ', statusSession);
    console.log('Session name: ', session);
}, {
    multidevice: false,
    folderNameToken: 'tokens',
    mkdirFolderToken: '',
    headless: true,
    devtools: false,
    useChrome: true,
    debug: false,
    logQR: true,
    browserWS: '',
    browserArgs: [''],
    addBrowserArgs: [''],
    puppeteerOptions: {},
    disableSpins: true,
    disableWelcome: true,
    updatesLog: true,
    autoClose: 60000,
    createPathFileToken: false,
    chromiumVersion: '818858',
    addProxy: [''],
    userProxy: '',
    userPass: ''
}, (browser, waPage) => {
    console.log('Browser PID:', browser.process().pid);
    waPage.screenshot({ path: 'screenshot.png' });
})
    .then((client) => {
    start(client);
})
    .catch((erro) => {
    console.log(erro);
});
function start(client) {
    client.onMessage((message) => {
        if (message.body === 'Hi' && message.isGroupMsg === false) {
            client
                .sendText(message.from, 'Welcome Venom 🕷')
                .then((result) => {
                console.log('Result: ', result);
            })
                .catch((erro) => {
                console.error('Error when sending: ', erro);
            });
        }
    });
}
const port = process.env.PORT;
app.listen(port, () => console.log("Conectado! PORT: " + port));
