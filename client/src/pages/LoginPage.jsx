function LoginPage() {
  return (
    <div className="login-page">
      <div className="main">
        <h2>Login</h2>
        <div>
          <form>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="text" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" />
            </div>
            <button className="primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
