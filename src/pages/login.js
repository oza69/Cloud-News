import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/icon.jpg";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router";
import { Alert } from "reactstrap";

const Login = (props) => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(true);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  const setPasswordShown = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const { username, password } = userDetails;

  const loginFun = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.signIn(username, password);
      const email_verified = user.attributes["email"];
      if (email_verified) {
        props.setIsAuthenticated(true);
        props.setUser(user);
        history.push("/homepage");
        localStorage.setItem("username", username);
      }
    } catch (error) {
      if (error.message === "Incorrect username or password.") {
        setErrorMessage("Incorrect username or password or not registered");
        history.replace("/login");
      } else {
        history.push("/welcome");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={loginFun}>
        {errorMessage && (
          <Alert color="danger" isOpen={visible} toggle={onDismiss}>
            {errorMessage}
          </Alert>
        )}
          <img
            src={Logo}
            alt=""
            style={{
              width: "auto",
              height: "auto",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          <h3>Log In</h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={handleChange}
              name="username"
              id="username"
            />
          </div>
          <br></br>
          <div className="form-group">
            <label>Password</label>
            <input
              required
              className="form-control"
              placeholder="Enter password"
              type={showPassword ? "password" : "text"}
              value={password}
              onChange={handleChange}
              name="password"
              id="password"
            />
            <img
              src={
                showPassword
                  ? "https://icons.veryicon.com/png/o/miscellaneous/hekr/action-hide-password.png"
                  : "https://static.thenounproject.com/png/777508-200.png"
              }
              onClick={setPasswordShown}
              className="show-password-icon"
              alt="show/hide"
            />
          </div>

          <br></br>
          <button
            type="submit"
            className="btn btn-block"
            style={{ background: "#000000", color: "#FFFFFF" }}
          >
            Login
          </button>
          <p className="forgot-password">
            New User{" "}
            <Link to="/register">
              <b>Register?</b>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
