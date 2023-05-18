import session from "express-session";
import sessionFileStore from "session-file-store";
import { SESSION_SECRET, NODE_ENV } from "./config.js";

const FileStore = sessionFileStore(session);

const fileStoreOptions = {
  path: "./Data/sessions",
};

const sessionOptions = {
  name: "mySession",
  secret: SESSION_SECRET, //this should be stored in env
  store: new FileStore(fileStoreOptions),
  resave: false,
  saveUninitialized: false, //won't save session if not modified
  cookie: {
    secure: NODE_ENV === "development" ? false : true, //but then for dev needs trust proxy, 1
    httpOnly: true,
    name: "mySession",
  },
};

export { session, sessionOptions };
