import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Contexts/GlobalCtx";

function useOnEveryPage() {
  const { deleteAllMsg } = useContext(GlobalContext);
  const location = useLocation();

  useEffect(() => {
    deleteAllMsg(); //delete all messages on page change
  }, [deleteAllMsg, location.pathname]);
}

export default useOnEveryPage;
