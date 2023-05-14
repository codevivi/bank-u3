import Header from "../components/Parts/Header";
import Messages from "../components/Messages/Messages";
import Footer from "../components/Parts/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="App">
        <Header />
        <main className="container main">
          <Messages />
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
