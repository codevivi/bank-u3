import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Contexts/GlobalCtx";
import useLogin from "../hooks/useLogin";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addMsg } = useContext(GlobalContext);
  const [submitLoginDetails, loginResponse] = useLogin(addMsg);

  useEffect(() => {
    if (loginResponse === null) {
      return;
    }
    console.log(loginResponse.message);
  }, [loginResponse]);

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
              <input onChange={handleEmailInput} id="email" type="email" value={email} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input onChange={handlePasswordInput} id="password" type="password" value={password} />
            </div>
            <button className="primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
