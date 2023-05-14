import { GlobalProvider } from "./Contexts/GlobalCtx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AccountsPage from "./pages/AccountsPage.jsx";
import LoginPage from "./pages/LoginPage";
import { AccountsProvider } from "./Contexts/AccountsCtx";

function App() {
  return (
    <GlobalProvider>
      <AccountsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/accounts" element={<AccountsPage />} />;
              <Route path="/login" element={<LoginPage />} />;
            </Route>
          </Routes>
        </BrowserRouter>
      </AccountsProvider>
    </GlobalProvider>
  );
}

export default App;
