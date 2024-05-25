import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { userSliceActions } from "../../store/slices/UserSlice";
import axios from "axios";

const Signup = () => {
  const dispatch = useDispatch();

  const usernameRef = useRef();
  const userEmailRef = useRef();
  const userPaswordRef = useRef();

  const navigate = useNavigate();

  const onSignupSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      userSliceActions.signup({
        username: usernameRef.current.value,
        userEmail: userEmailRef.current.value,
      })
    );

    try {
      await axios.post("http://localhost:5500/api/v1/signup", {
        username: usernameRef.current.value,
        userEmail: userEmailRef.current.value,
        userPassword: userPaswordRef.current.value,
      });
    } catch (err) {
      console.log(err);
    }

    usernameRef.current.value = "";
    userEmailRef.current.value = "";
    userPaswordRef.current.value = "";

    navigate("/");
  };

  return (
    <div className="form-container">
      <h1 className="text-light display-4 mb-3">Chat Karo!</h1>
      <form action="" className="signup-form" onSubmit={onSignupSubmit}>
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
            type="email"
            className="form-control"
            placeholder="Email"
            ref={userEmailRef}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="*********************"
            ref={userPaswordRef}
            required
          />
        </div>
        <input
          type="submit"
          value="Signup"
          className="btn btn-primary singup-btn"
        />
      </form>
      <div className="account-login d-flex align-items-center justify-content-between mt-3 text-white">
        <span className="d-inline-block mr-4">Have an account! &nbsp;</span>
        <Link className="d-inline-block text-success" to="/">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
