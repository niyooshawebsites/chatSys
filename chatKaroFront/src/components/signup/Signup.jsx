import "./signup.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { userSliceActions } from "../../store/slices/UserSlice";

const Signup = () => {
  const dispatch = useDispatch();

  const usernameRef = useRef();
  const userEmailRef = useRef();
  const userPaswordRef = useRef();

  const onSignupSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userSliceActions.signup({
        username: usernameRef.current.value,
        userEmail: userEmailRef.current.value,
        userPassword: userPaswordRef.current.value,
      })
    );

    usernameRef.current.value = "";
    userEmailRef.current.value = "";
    userPaswordRef.current.value = "";
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
        <Link className="d-inline-block text-success" to="/login">
          Login
        </Link>
        <Link className="d-inline-block text-success" to="/chat">
          Chat
        </Link>
      </div>
    </div>
  );
};

export default Signup;