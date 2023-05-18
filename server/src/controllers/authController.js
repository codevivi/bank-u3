import { usersModel } from "../models/allModels.js";
import { SESSION_COOKIE_NAME } from "../utils/config.js";
import { comparePassword } from "../utils/crypt.js";

export const login = async (req, res, next) => {
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
};

export const whoAmI = async (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.status(200).json({
      type: "success",
      user: req.session.user,
    });
    return;
  } else {
    res.status(200).json({
      type: "success",
      user: null,
    });
  }
};

export const logout = (req, res, next) => {
  req.session.destroy();
  if (req.session) {
    req.session = null;
  }
  res.status(200).clearCookie(SESSION_COOKIE_NAME, { path: "/" }).json({
    type: "success",
    message: "You are logged out",
  });
};
