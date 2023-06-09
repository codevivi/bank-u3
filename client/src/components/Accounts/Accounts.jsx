import { useEffect, useState } from "react";
import { useContext } from "react";
import { AccountsContext } from "../../Contexts/AccountsCtx";
import { GlobalContext } from "../../Contexts/GlobalCtx";
import AddAccount from "./AddAccount";
import OneAccountRow from "./OneAccountRow";
import Filter from "./Filter";
import Stats from "./Stats";

export default function Accounts() {
  const [addAccountModalOpen, setAddAccountModalOpen] = useState(false);
  const { accounts, displayAccounts, setFilterFunc, setNewAccount, setDeleteAccountId, setUpdateAccount, changed } = useContext(AccountsContext);
  const { stats, updateStats } = useContext(GlobalContext);

  useEffect(() => {
    if (!changed) {
      return;
    }
    updateStats();
  }, [changed, updateStats]);

  if (accounts === null || displayAccounts === null) {
    return (
      <section className="accounts">
        <h1 style={{ fontSize: "48px" }}>Loading...</h1>
      </section>
    );
  }
  return (
    <section className="accounts">
      <h1>Sąskaitos</h1>
      <div className="top">
        <Stats stats={stats} />
        <button className="open-btn" onClick={() => setAddAccountModalOpen(true)}>
          Pridėti sąskaitą
        </button>
      </div>
      {accounts?.length > 0 && (
        <>
          <Filter setFilterFunc={setFilterFunc} />

          <table className="accounts-table">
            <thead>
              <tr>
                <th>Pavardė</th>
                <th>Vardas</th>
                <th>Sąskaitos suma</th>
                <th>Veiksmai</th>
              </tr>
            </thead>

            <tbody>
              {displayAccounts.map((account) => (
                <OneAccountRow key={account.id} account={account} setDeleteAccountId={setDeleteAccountId} setUpdateAccount={setUpdateAccount} />
              ))}
            </tbody>
          </table>
        </>
      )}
      {addAccountModalOpen && <AddAccount setAddAccountModalOpen={setAddAccountModalOpen} setNewAccount={setNewAccount} />}
    </section>
  );
}
