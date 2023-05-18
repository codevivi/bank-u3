import { GlobalProvider } from "./Contexts/GlobalCtx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AccountsPage from "./pages/AccountsPage.jsx";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/accounts" element={<AccountsPage />} />;
            <Route path="/login" element={<LoginPage />} />;
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
