import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { loggedinUserSliceActions } from "../../store/slices/LoggedinUserSlice";
import { useDispatch } from "react-redux";
import { socket } from "../../socket";

const Login = () => {
  // connect to socket
  socket.connect();

  const navigate = useNavigate();
  const usernameRef = useRef();
  const userPasswordRef = useRef();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      loggedinUserSliceActions.usersLoggedin({
        loggedinUsername: usernameRef.current.value.trim(),
      })
    );

    // sending the username to the server
    socket.emit("loggedinUser", usernameRef.current.value.trim());
    console.log(socket.id);

    try {
      await axios
        .post("http://localhost:5500/api/v1/login", {
          username: usernameRef.current.value,
          userPassword: userPasswordRef.current.value,
        })
        .then((data) => {
          // saving the token
          sessionStorage.setItem("authToken", data.data.token);
          // save the username in the sessionStorage
          sessionStorage.setItem("chatKaro_username", data.data.username);
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
      <h1 className="text-light display-4 mb-3">Gup Shup</h1>
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
          className="btn btn-success login-btn"
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
