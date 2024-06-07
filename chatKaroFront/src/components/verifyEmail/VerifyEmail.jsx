import { useRef } from "react";
import "./verifyEmail.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { ownerID } = useParams();
  const otpRef = useRef();
  const ownerIdRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5500/api/v1/verify-email", {
        owner: ownerIdRef.current.value,
        otp: otpRef.current.value,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form-container">
      <h1 className="text-light display-4 mb-3">Gup Shup</h1>
      <form className="verify-form" onSubmit={handleFormSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter OTP"
            value={ownerID}
            ref={ownerIdRef}
            readOnly
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter OTP"
            ref={otpRef}
            required
          />
        </div>
        <input
          type="submit"
          value="Verify Account"
          className="btn btn-success verify-btn"
        />
      </form>
      <div className="account-login d-flex align-items-center justify-content-between mt-3 text-white">
        <span className="d-inline-block mr-4">
          Account alerady verified? &nbsp;
        </span>
        <Link className="d-inline-block text-success" to="/">
          Login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
