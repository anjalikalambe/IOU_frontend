import React, { useState, useEffect } from "react";
import "./App.scss";
import TopNav from "./components/TopNav.js";
import SideNav from "./components/SideNav.js";
import Home from "./views/Home.js";
import Login from "./views/Login.js";
import Register from "./views/Register.js";
import ClaimRewards from "./views/ClaimRewards.js";
import GiftFavours from "./views/GiftFavours.js";
import PublicRequests from "./views/PublicRequests.js";
import Leaderboard from "./views/Leaderboard.js";
import {
  Route,
  useHistory,
  withRouter,
  useLocation,
  Switch,
} from "react-router-dom";
import { useStore } from "./stores/helpers/UseStore";
import { observer } from "mobx-react-lite";
import ProtectedRoute from "./utils/ProtectedRoute";
import UnprotectedRoute from "./utils/UnprotectedRoute";

function App() {
  const {
    auth
  } = useStore();

  const data = JSON.parse(localStorage.getItem("data"));

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    auth.validateToken();
  }, [])

  return (
    <div id="app">
      <Route path="/" exact component={Home} />
      <UnprotectedRoute path="/login" component={Login} />
      {auth.loggedIn && <SideNav />}
      <div className="main" style={{ display: auth.loggedIn ? 'block' : 'none'}}>
        {auth.loggedIn && <TopNav />}
        <div className="component-wrapper">
          <ProtectedRoute path="/get-someone" component={ClaimRewards} />
          <ProtectedRoute path="/give-someone" component={GiftFavours} />
          <ProtectedRoute path="/public-requests" component={PublicRequests} />
          <ProtectedRoute path="/leaderboard" component={Leaderboard} />
        </div>
      </div>
    </div>
  );
}

export default withRouter(observer(App));
