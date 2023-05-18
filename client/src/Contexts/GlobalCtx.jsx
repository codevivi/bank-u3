import { createContext, useCallback, useEffect, useState } from "react";
import useMessages from "../hooks/useMessages";
import useLogin from "../hooks/useLogin";
import useStats from "../hooks/useStats";

export const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
  const [user, setUser] = useState(null);
  const [messages, addMsg, deleteMsg, deleteAllMsg] = useMessages();
  const [stats, updateStats] = useStats();

  const setLoggedInUser = useCallback((loggedInUser) => {
    setUser(loggedInUser);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user: user,
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
