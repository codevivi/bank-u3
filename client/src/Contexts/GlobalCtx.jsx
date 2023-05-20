import { createContext, useCallback, useEffect, useState } from "react";
import useMessages from "../hooks/useMessages";
import useStats from "../hooks/useStats";
import axios from "axios";
import { SERVER_BASE_PATH } from "../utils/config";

export const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userCheckTime, setUserCheckTime] = useState(null);
  const [messages, addMsg, deleteMsg, deleteAllMsg] = useMessages();
  const [stats, updateStats, statsMessage] = useStats();

  const setLoggedInUser = useCallback((loggedInUser) => {
    setUser(loggedInUser);
  }, []);

  const checkUser = useCallback(() => {
    setUserCheckTime(Date.now());
  }, []);

  useEffect(() => {
    if (userCheckTime === null) {
      return;
    }
    axios
      .get(SERVER_BASE_PATH + "/whoAmI", { withCredentials: true })
      .then((res) => {
        setLoggedInUser(res.data.user);
      })
      .catch((e) => {
        addMsg({ type: "error", text: "Klaida atnaujinant prisijugimo būseną." });
      });
  }, [userCheckTime, setLoggedInUser, addMsg]);

  useEffect(() => {
    if (statsMessage === null) {
      return;
    }
    addMsg(statsMessage);
  }, [statsMessage, addMsg]);

  return (
    <GlobalContext.Provider
      value={{
        user: user,
        checkUser: checkUser,
        setLoggedInUser: setLoggedInUser,
        messages: messages,
        addMsg: addMsg,
        deleteMsg: deleteMsg,
        deleteAllMsg: deleteAllMsg,
        stats: stats,
        updateStats: updateStats,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
