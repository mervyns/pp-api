import express, { Application, Request, Response, NextFunction } from "express";
const { userValidationRules, validate } = require('./validator.js');
import fs from "fs";
import path from "path";

// Express APP config
const app: Application = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Hi");
});

app.get("/transactions", (req: Request, res: Response) => {
  const transactionsArray: any = fs.readFileSync(path.join(__dirname, "../data/transactions.json"))
  res.send(transactionsArray)
});

app.post("/transactions", userValidationRules(), validate, (req: Request, res: Response) => {
  console.log(req.body);
  let transactionsArray: any = fs.readFileSync(path.join(__dirname, "../data/transactions.json"))
  let transactionsArrayParsed = JSON.parse(transactionsArray)
  transactionsArrayParsed.push(req.body)
  fs.writeFile(path.join(__dirname, "../data/transactions.json"), JSON.stringify(transactionsArrayParsed), (err: any) => {
    if (err) throw err;
    console.log('Saved!');
  })
  res.send("ok");
});

// export our app
export default app;