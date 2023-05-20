import { createContext, useEffect, useCallback, useState, useContext } from "react";
import axios from "axios";
import { SERVER_BASE_PATH } from "../utils/config";
import { GlobalContext } from "./GlobalCtx";

export const AuthCtx = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const { addMsg } = useContext(GlobalContext);

  const [authCheckTime, setAuthCheckTime] = useState(null);

  const checkAuth = useCallback(() => {
    setAuthCheckTime(Date.now());
  }, []);

  useEffect(() => {
    if (authCheckTime === null) {
      return;
    }
    axios
      .get(SERVER_BASE_PATH + "/whoAmI", { withCredentials: true })
      .then((res) => {
        setAuth({ user: res.data.user });
      })
      .catch((e) => {
        addMsg({ type: "error", text: "Klaida atnaujinant prisijugimo būseną." });
      });
  }, [authCheckTime, addMsg]);

  const setAuthState = useCallback((objWithUser) => {
    setAuth(objWithUser);
  }, []);
  return <AuthCtx.Provider value={{ auth, setAuthState, checkAuth }}>{children}</AuthCtx.Provider>;
};
