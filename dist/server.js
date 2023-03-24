"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_js_1 = require("./database.js");
const app = (0, express_1.default)();
const PORT = 4444;
// For parsing application/json
app.use(express_1.default.json());
// For parsing application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const user = yield (0, database_js_1.getUserByName)(name);
    if (!user || user.name !== name && user.password !== password) {
        res.send("Acess denied");
        return;
    }
    res.send("Acess garated");
}));
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.send("Missing required parameters");
        return;
    }
    const user = yield (0, database_js_1.getUserByName)(name);
    if (!user) {
        const result = yield (0, database_js_1.createUser)(name, email, password);
        res.status(201).send('User registered');
        return;
    }
    console.log(user);
    if (user.name) {
        res.send('Name already registered');
        return;
    }
    if (user.email) {
        res.send('Email already registered');
        return;
    }
    return;
}));
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
