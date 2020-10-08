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

function App() {
  const {
    dataStore: { auth },
  } = useStore();

  console.log(auth);

  const data = JSON.parse(localStorage.getItem("data"));

  const location = useLocation();
  const history = useHistory();

  // useEffect(() => {
  //   if (data) {
  //     auth.loggedIn = data.token ? data.token : false;
  //     auth.name = data.name ? data.name : 'null';
  //   } else {
  //     auth.loggedIn = false;
  //     auth.name = '';
  //   }

  //   if (!auth.loggedIn && location.pathname !== '/login') {
  //     history.push('/login');
  //   }
  //   if (location.pathname === '/login' && auth.loggedIn) {
  //     history.push('/get-someone');
  //   }
  // })

  return (
    <div id="app">
      <Route path="/" exact component={Home} />
      <Route path="/login" component={() => <Login />} />
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
