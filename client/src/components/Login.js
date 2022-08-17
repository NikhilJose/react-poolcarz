import axios from "axios";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

let url = "http://localhost:5000/login";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    if (event.target.name === "userName") setUserName(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
    if (userName === "") {
      setUserNameError("Username is required");
    } else {
      setUserNameError("");
    }

    const loginData = {
      userName: userName,
      password: password,
    };

    axios
      .post(url, loginData)
      .then((response) => {
        if (response) {
          dispatch({ type: "LOGIN", payload: userName });
          navigate("/show_rides");
        }
      })
      .catch((error) => {
        if (error) {
          setErrorMessage("Credentials mismatch!");
        }
      });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={inputChangeHandler}
          />
          {userNameError && <span>{userNameError}</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={inputChangeHandler}
          />
          {passwordError && <span>{passwordError}</span>}
        </div>
        <button type="submit">Login</button>
        {errorMessage && <span>{errorMessage}</span>}
      </form>
    </Fragment>
  );
};

export default Login;
