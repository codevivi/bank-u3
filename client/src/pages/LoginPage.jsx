import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Contexts/GlobalCtx";
import useLogin from "../hooks/useLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthCtx } from "../Contexts/AuthCtx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addMsg, deleteAllMsg } = useContext(GlobalContext);
  const { setAuthState } = useContext(AuthCtx);
  const [submitLoginDetails, loginResponse] = useLogin(addMsg);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    deleteAllMsg();
  }, [deleteAllMsg]);

  useEffect(() => {
    if (loginResponse === null) {
      return;
    }
    if (loginResponse.user) {
      setAuthState({ user: loginResponse.user });
      navigate(from, { replace: true });
    } else {
      addMsg({ type: "error", text: loginResponse.message });
    }
  }, [loginResponse, addMsg, setAuthState, from, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      submitLoginDetails({ email, password });
      setEmail("");
      setPassword("");
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="login-page">
      <div className="main">
        <h2>Login</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input onChange={handleEmailInput} id="email" required type="email" value={email} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input onChange={handlePasswordInput} id="password" required type="password" value={password} />
            </div>
            <button className="primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
