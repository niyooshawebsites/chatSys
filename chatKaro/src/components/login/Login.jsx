import "./login.css";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="form-container">
      <h1 className="text-light display-4 mb-3">Chat Karo!</h1>
      <form action="" className="login-form">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="*********************"
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary login-btn"
        />
      </form>
      <div className="account-login d-flex align-items-center justify-content-between mt-3 text-white">
        <span className="d-inline-block mr-4">Have an account! &nbsp;</span>
        <Link className="d-inline-block text-success" to="/">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
