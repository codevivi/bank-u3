import Stats from "../components/Accounts/Stats";
import pig from "../assets/images/pig.svg";
import { GlobalContext } from "../Contexts/GlobalCtx";
import { useContext, useEffect } from "react";
import useStatsForHomePage from "../hooks/useStats";
function HomePage() {
  const { deleteAllMsg, stats } = useContext(GlobalContext);

  useEffect(() => {
    deleteAllMsg();
  }, [deleteAllMsg]);

  return (
    <div className="home-page">
      <Stats stats={stats} />
      <img src={pig} alt="piggy bank" />
    </div>
  );
}

export default HomePage;
