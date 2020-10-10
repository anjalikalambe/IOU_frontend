import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import "./Login.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/helpers/UseStore";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {
  const {
    auth,
  } = useStore();
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    newPassword: "",
    email: "",
  });
  const [usernameError, setUsernameError] = useState({
    error: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    error: false,
    message: "",
  });
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "info",
  });
  const { open, message, type } = snackbarState;
  const history = useHistory();
  const openSnackbar = (message, type = "info") => {
    setSnackbarState({ open: true, message, type });
  };
  const closeSnackbar = () => {
    setSnackbarState({ open: false, message, type });
  };

  const clearState = () => {
    setState({
      username: "",
      password: "",
      confirmPassword: "",
      newPassword: "",
      email: "",
    });
  };
  const clearErrors = () => {
    setUsernameError({ error: false, message: "" });
    setPasswordError({ error: false, message: "" });
    setConfirmPasswordError({ error: false, message: "" });
  };
  const showLogin = () => {
    clearState();
    clearErrors();
    document.getElementById("container").classList.remove("right-panel-active");
  };
  const showRegister = () => {
    clearState();
    clearErrors();
    document.getElementById("container").classList.add("right-panel-active");
  };

  const validateSignUp = () => {
    let valid = true;
    if (state.password !== state.confirmPassword) {
      setConfirmPasswordError({
        error: true,
        message: "Passwords must match",
      });
      valid = false;
    } else {
      setConfirmPasswordError({
        error: false,
        message: "",
      });
    }
    if (state.password.length < 6) {
      setPasswordError({
        error: true,
        message: "Please input a stronger password",
      });
      valid = false;
    } else {
      setPasswordError({
        error: false,
        message: "",
      });
    }
    return valid;
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:5000/auth/login", {
        username: state.username,
        password: state.password,
      });
      if (!response.success) throw new Error();
      auth.login({
        token: response.data.token,
        username: state.username,
      }, () => {
          history.push('/get-someone');
      })
    } catch (e) {
      setUsernameError({ error: true, message: "" });
      setPasswordError({ error: true, message: "" });
      if (!e) return;
      openSnackbar(e.response.data.message, "error");
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateSignUp()) {
      try {
        let response = await axios.post("http://localhost:5000/auth/register", {
          username: state.username,
          password: state.password,
          confirmPassword: state.password,
        });
        openSnackbar("Account was successfully created", "success");
        showLogin();
      } catch (e) {
        openSnackbar(e.response.data.message, "error");
      }
    }
  };
  return (
    <div id="login">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={closeSnackbar}
        key={"topright"}
        autoHideDuration={3000}
      >
        <Alert onClose={closeSnackbar} severity={type}>
          {message}
        </Alert>
      </Snackbar>
      <div className="bg" />
      <div id="container" className="login-container">
        <div className="form-container sign-up-container">
          <h1>Sign Up</h1>
          <div className="input-wrap">
            <form autoComplete="off" onSubmit={handleSignUp}>
              <TextField
                error={usernameError.error}
                helperText={usernameError.message}
                required
                id="standard"
                label="Username"
                name="username"
                onChange={(e) =>
                  setState({ ...state, username: e.target.value })
                }
                InputProps={{ value: state.username }}
              />
              <TextField
                error={passwordError.error}
                helperText={passwordError.message}
                required
                id="standard-required"
                label="Password"
                type="password"
                name="password"
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                InputProps={{ value: state.password }}
              />
              <TextField
                error={confirmPasswordError.error}
                helperText={confirmPasswordError.message}
                required
                id="standard-required"
                label="Confirm Password"
                type="password"
                name="password"
                onChange={(e) =>
                  setState({ ...state, confirmPassword: e.target.value })
                }
                InputProps={{ value: state.confirmPassword }}
              />
              <span
                style={{
                  textAlign: "left",
                  width: "100%",
                  marginBottom: "16px",
                }}
                onClick={showLogin}
              >
                Already have an account?
              </span>
              <button type="submit" className="ghost">
                Register
              </button>
            </form>
          </div>
        </div>

        <div className="form-container sign-in-container">
          <form autoComplete="off" noValidate onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <div className="input-wrap">
              <TextField
                error={usernameError.error}
                required
                id="standard-required"
                label="Username"
                name="username"
                onChange={(e) =>
                  setState({ ...state, username: e.target.value })
                }
                InputProps={{ value: state.username }}
              />
              <TextField
                error={passwordError.error}
                required
                id="standard-required"
                label="Password"
                type="password"
                name="password"
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                InputProps={{ value: state.password }}
              />
              {state.loginError ? (
                <p className="text-danger">{state.loginError}</p>
              ) : null}
              <span style={{ textAlign: "left" }} onClick={showRegister}>
                Don't have an account?
              </span>
              <button type="submit" className="ghost">
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Already have an account?</h1>
              <button onClick={showLogin} className="ghost">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Don't have an account?</h1>
              <button onClick={showRegister} className="ghost">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Login);
