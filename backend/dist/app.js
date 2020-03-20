"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { userValidationRules, validate } = require('./validator.js');
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Express APP config
const app = express_1.default();
app.set("port", process.env.PORT || 3000);
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// API Endpoints
app.get("/", (req, res) => {
    res.send("Hi");
});
app.get("/transactions", (req, res) => {
    const transactionsArray = fs_1.default.readFileSync(path_1.default.join(__dirname, "../data/transactions.json"));
    res.send(transactionsArray);
});
app.post("/transactions", userValidationRules(), validate, (req, res) => {
    console.log(req.body);
    let transactionsArray = fs_1.default.readFileSync(path_1.default.join(__dirname, "../data/transactions.json"));
    let transactionsArrayParsed = JSON.parse(transactionsArray);
    transactionsArrayParsed.push(req.body);
    fs_1.default.writeFile(path_1.default.join(__dirname, "../data/transactions.json"), JSON.stringify(transactionsArrayParsed), (err) => {
        if (err)
            throw err;
        console.log('Saved!');
    });
    res.send("ok");
});
// export our app
exports.default = app;
//# sourceMappingURL=app.js.map