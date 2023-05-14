import express from "express";
import cors from "cors";
import { accountsModel } from "./src/models/allModels.js";

const PORT = 5000;
const DB = "./Data/data.json";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/accounts", async (req, res) => {
  try {
    const accounts = await accountsModel.getAll();
    res.json({
      message: "OK",
      accounts,
    });
  } catch (err) {
    res.json({
      message: "failure",
      accounts: null,
    });
  }
});

app.post("/accounts", async (req, res) => {
  try {
    const id = await accountsModel.add(req.body.account);
    res.json({
      message: "OK",
      promiseId: req.body.promiseId,
      id,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "failure",
      promiseId: req.body.promiseId,
    });
  }
});

app.put("/accounts/:id", async (req, res) => {
  try {
    await accountsModel.update(req.params.id, req.body.account);
    res.json({
      message: "OK",
      promiseId: req.body.promiseId,
      id: req.body.account.id,
    });
  } catch (err) {
    res.json({
      message: "failure",
      promiseId: req.body.promiseId,
      id: req.body.account.id,
    });
  }
});

app.delete("/accounts/:id", async (req, res) => {
  try {
    await accountsModel.delete(req.params.id);
    res.json({
      message: "OK",
    });
  } catch (err) {
    res.json({
      message: "failure",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Bank U2 server is running on port ${PORT}`);
});
