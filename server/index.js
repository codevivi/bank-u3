import express from "express";
import cors from "cors";
import { accountsModel, usersModel } from "./src/models/allModels.js";
import session from "express-session";
import sessionFileStore from "session-file-store";
import { comparePassword } from "./src/utils/crypt.js";

const PORT = 5000;
const DB = "./Data/data.json";
const FileStore = sessionFileStore(session);

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const fileStoreOptions = {
  path: "./Data/sessions",
};

app.use(
  session({
    secret: "kacius juodas", //this should be stored in env
    store: new FileStore(fileStoreOptions),
    resave: false,
    name: "mySession",
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, //use true for production, will only work on https
  })
);

function addHeaders(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(addHeaders);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.getByEmail(email);
    if (!user) {
      res.json({ message: "Did not find user with this email address." });
      return;
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.json({ message: "Login details did not match" });
      return;
    } else {
      req.session.isLoggedIn = true;
      req.session.user = { name: user.userName, email: user.email };
      res.json({ message: "OK" });
    }
  } catch (e) {
    res.json({ message: "Internal server error" });
  }
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

app.get("/stats", async (req, res) => {
  console.log("trying to get");
  try {
    const [count, totalMoney] = await Promise.all([accountsModel.getAllAccountsCount(), accountsModel.getTotalMoneyInAllAccounts()]);
    // const count = await accountsModel.getAllAccountsCount();
    // const totalMoney = await accountsModel.getTotalMoneyInAllAccounts();
    console.log(count, totalMoney);
    res.json({
      message: "OK",
      stats: { count: count, totalMoney: totalMoney },
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "failure",
      stats: null,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Bank U2 server is running on port ${PORT}`);
});
