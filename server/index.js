import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT, CLIENT } from "./src/utils/config.js";
import { accountsModel, usersModel } from "./src/models/allModels.js";
import { session, sessionOptions } from "./src/utils/session.js";
import { comparePassword } from "./src/utils/crypt.js";

const app = express();

app.use(cors({ origin: CLIENT, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session(sessionOptions));

app.get("/api/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/login", async (req, res) => {
  if (req.session.isLoggedIn) {
    res.json({ message: "already logged in" });
  }
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
      const userWithoutPassword = { name: user.userName, email: user.email };
      // res.cookie("bla", "bla");
      req.session.isLoggedIn = true;
      req.session.user = userWithoutPassword;
      res.json({ message: "OK", user: userWithoutPassword });
    }
  } catch (e) {
    console.log(e);
    res.json({ message: "Internal server error" });
  }
});

app.get("/api/accounts", async (req, res) => {
  try {
    if (req.session.user) {
      const accounts = await accountsModel.getAll();
      res.json({
        message: "OK",
        accounts,
      });
    } else {
      res.json({
        message: "not authentikated",
      });
    }
  } catch (err) {
    res.json({
      message: "failure",
      accounts: null,
    });
  }
});

app.post("/api/accounts", async (req, res) => {
  try {
    const id = await accountsModel.add(req.body.account);
    res.json({
      message: "OK",
      promiseId: req.body.promiseId,
      id,
    });
  } catch (err) {
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

app.delete("/api/accounts/:id", async (req, res) => {
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

app.get("/api/stats", async (req, res) => {
  try {
    const [count, totalMoney] = await Promise.all([accountsModel.getAllAccountsCount(), accountsModel.getTotalMoneyInAllAccounts()]);
    res.json({
      message: "OK",
      stats: { count: count, totalMoney: totalMoney },
    });
  } catch (err) {
    res.json({
      message: "failure",
      stats: null,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Bank U3 server is running on port ${PORT}`);
});
