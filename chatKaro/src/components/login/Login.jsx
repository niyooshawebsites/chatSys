import "./login.css";

const Login = () => {
  return (
    <div className="form-container">
      <h1>Chat karo</h1>
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
      <input type="submit" value="Login" className="btn btn-primary" />
    </div>
  );
};

export default Login;
