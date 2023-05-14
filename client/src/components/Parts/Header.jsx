import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useLocation } from "react-router-dom";
function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="page-header">
      <div className="container">
        <Link className="logo" to="/">
          <img src={logo} alt="React bank logo" width={96} />
          <span>React Bankas</span>
        </Link>
        {path !== "/login" && (
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
