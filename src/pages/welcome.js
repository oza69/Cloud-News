import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/icon.jpg";

const Welcome = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
      <h1>Welcome!</h1>
        <p>You have successfully registered a new account.</p>
        <p>We've sent you a email. Please click on the confirmation link to verify your account.</p>
        <p>If you have confirmed both mails please click on <Link to={"/login"}>Login</Link></p>
      </div>
    </div>
  );
};
export default Welcome;
