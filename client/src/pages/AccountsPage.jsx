import Accounts from "../components/Accounts/Accounts.jsx";
import { GlobalContext } from "../Contexts/GlobalCtx";
import { useContext, useEffect } from "react";
function AccountsPage() {
  const { deleteAllMsg } = useContext(GlobalContext);
  useEffect(() => {
    deleteAllMsg();
  }, [deleteAllMsg]);
  return (
    <>
      <Accounts />
    </>
  );
}

export default AccountsPage;
