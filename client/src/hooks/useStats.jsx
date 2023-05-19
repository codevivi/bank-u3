import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SERVER_BASE_PATH } from "../utils/config";

const URL = SERVER_BASE_PATH + "/stats";

function useStats() {
  const [stats, setStats] = useState(null);
  const [statsUpdateTime, setStatsUpdateTime] = useState(null);
  const [message, setMessage] = useState(null);

  const updateStats = useCallback(() => {
    setStatsUpdateTime(Date.now());
  }, []);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        setStats(res.data.stats);
      })
      .catch((e) => {
        setMessage({ type: "error", text: "Serverio klaida, nepavyko gauti statistikos" });
      });
  }, [statsUpdateTime]);

  return [stats, updateStats, message];
}

export default useStats;
