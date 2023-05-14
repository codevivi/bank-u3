import Stats from "../components/Accounts/Stats";
import pig from "../assets/images/pig.svg";
import { GlobalContext } from "../Contexts/GlobalCtx";
import { useContext, useEffect } from "react";
function HomePage() {
  const { deleteAllMsg } = useContext(GlobalContext);
  useEffect(() => {
    deleteAllMsg();
  }, [deleteAllMsg]);

  return (
    <div className="home-page">
      <Stats />
      <img src={pig} alt="piggy bank" />
    </div>
  );
}

export default HomePage;
