import { useRef } from "react";
import "./verifiyEmail.css";

const VerifyEmail = () => {
  const otpRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="form-container">
      <h1 className="text-light display-4 mb-3">Gup Shup</h1>
      <form action="" className="verify-form" onSubmit={handleFormSubmit}>
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
          value="Verify"
          className="btn btn-success verify-btn"
        />
      </form>
    </div>
  );
};

export default VerifyEmail;
