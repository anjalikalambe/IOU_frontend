import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import "./Login.scss";
import { makeStyles } from '@material-ui/core/styles';
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/helpers/UseStore";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { dataStore: { auth } } = useStore();

  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    newPassword: "",
    email: "",
  })

  const [usernameError, setUsernameError] = useState({
    error: false,
    message: "",
  })
  
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: "",
  })
  
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    error: false,
    message: "",
  })

  const history = useHistory();

  const onLogin = () => {
    clearState();
    document.getElementById("container").classList.remove("right-panel-active");
  }

  const onRegister = () => {
    clearState();
    document.getElementById("container").classList.add("right-panel-active");
  }

  const clearState = () => {
    setState({
      username: "",
      password: "",
      confirmPassword: "",
      newPassword: "",
      email: "",
    })
  }

  const validateSignUp = () => {
    let valid = true;
    
    if (state.password !== state.confirmPassword) {
      setConfirmPasswordError({
        error: true,
        message: "Passwords must match",
      })
      valid = false;
    }
    else {
      setConfirmPasswordError({
        error: false,
        message: "",
      })
    }
    if (state.password.length < 8) {
      setPasswordError({
        error: true,
        message: "Please input a stronger password",
      })
      valid = false;
    }
    else {
      setPasswordError({
        error: false,
        message: "",
      })
    }
    return valid;
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    auth.login({
      name: state.username,
      password: state.password
    });
  }
  
  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (validateSignUp()) {
      auth.login({
        name: state.username,
        password: state.password
      });
    } 
  }

  return (
    <div id="login">
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
                  onChange={(e) => setState({...state, username: e.target.value})}
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
                  onChange={(e) => setState({...state, password: e.target.value})}
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
                  onChange={(e) => setState({...state, confirmPassword: e.target.value})}
                  InputProps={{ value: state.confirmPassword }}
                />
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
                id="standard-required"
                label="Username"
                name="username"
                onChange={(e) => setState({...state, username: e.target.value})}
                InputProps={{ value: state.username }}
              />
              <TextField
                id="standard-required"
                label="Password"
                type="password"
                name="password"
                onChange={(e) => setState({...state, password: e.target.value})}
                InputProps={{ value: state.password }}
              />
              {state.loginError ? (
                <p className="text-danger">{state.loginError}</p>
              ) : null}
              <span style={{textAlign: 'left'}}>Don't have an account?</span>
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
              <button onClick={onLogin} className="ghost">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Don't have an account?</h1>
              <button onClick={onRegister} className="ghost">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Login);