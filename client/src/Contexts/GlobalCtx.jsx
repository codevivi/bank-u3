import { createContext, useEffect, useState } from "react";
import useMessages from "../hooks/useMessages";
import useLogin from "../hooks/useLogin";
import useStats from "../hooks/useStats";

export const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
  const [messages, addMsg, deleteMsg, deleteAllMsg] = useMessages();
  const [stats, setStatsUpdateTime] = useStats();

  return (
    <GlobalContext.Provider
      value={{
        messages: messages,
        addMsg: addMsg,
        deleteMsg: deleteMsg,
        deleteAllMsg: deleteAllMsg,
        stats: stats,
        setStatsUpdateTime: setStatsUpdateTime,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
