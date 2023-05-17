import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:5000/stats";
function useStats() {
  const [stats, setStats] = useState(null);
  const [statsUpdateTime, setStatsUpdateTime] = useState(Date.now());

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        if (res.data.message === "OK") {
          setStats(res.data.stats);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [statsUpdateTime]);

  return [stats, setStatsUpdateTime];
}

export default useStats;
