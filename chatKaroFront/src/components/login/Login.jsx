import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { loggedinUserSliceActions } from "../../store/slices/LoggedinUserSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const userPasswordRef = useRef();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      loggedinUserSliceActions.usersLoggedin({
        loggedinUsername: usernameRef.current.value,
      })
    );

    try {
      await axios
        .post("http://localhost:5500/api/v1/login", {
          username: usernameRef.current.value,
          userPassword: userPasswordRef.current.value,
        })
        .then((data) => {
          sessionStorage.setItem("authToken", data.data.token);
        })
        .catch((err) => console.log(err));

      // setting the jwt token received from logincontroller in sessionStorage
    } catch (err) {
      console.log(err);
    }

    usernameRef.current.value = "";
    userPasswordRef.current.value = "";

    const moveToPage = (page) => navigate(page);
    moveToPage("/chat");
  };

  return (
    <div className="form-container">
      <h1 className="text-light display-4 mb-3">Chat Karo!</h1>
      <form action="" className="login-form" onSubmit={handleFormSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            ref={usernameRef}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="***********"
            ref={userPasswordRef}
            required
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
        <Link className="d-inline-block text-success" to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
