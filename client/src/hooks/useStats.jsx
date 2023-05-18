import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SERVER_BASE_PATH } from "../utils/config";

const URL = SERVER_BASE_PATH + "/stats";

function useStats() {
  const [stats, setStats] = useState(null);
  const [statsUpdateTime, setStatsUpdateTime] = useState(Date.now());

  const updateStats = useCallback(() => {
    setStatsUpdateTime(Date.now());
  }, []);

  useEffect(() => {
    axios
      .get(URL, { headers: { withCredentials: true } })
      .then((res) => {
        if (res.data.message === "OK") {
          setStats(res.data.stats);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [statsUpdateTime]);

  return [stats, updateStats];
}

export default useStats;
