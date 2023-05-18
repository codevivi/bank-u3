import Accounts from "../components/Accounts/Accounts.jsx";
import { AccountsProvider } from "../Contexts/AccountsCtx.jsx";
import { GlobalContext } from "../Contexts/GlobalCtx";
import { useContext, useEffect } from "react";
function AccountsPage() {
  const { deleteAllMsg } = useContext(GlobalContext);
  useEffect(() => {
    deleteAllMsg();
  }, [deleteAllMsg]);
  return (
    <>
      <AccountsProvider>
        <Accounts />
      </AccountsProvider>
    </>
  );
}

export default AccountsPage;
