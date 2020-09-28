import React, { useState, useEffect } from 'react'
import './App.scss'
import TopNav from './components/TopNav.js'
import SideNav from './components/SideNav.js'
import Home from './views/Home.js'
import Login from './views/Login.js'
import Register from './views/Register.js'
import ClaimRewards from './views/ClaimRewards.js'
import GiftFavours from './views/GiftFavours.js'
import PublicRequests from './views/PublicRequests.js'
import Leaderboard from './views/Leaderboard.js'
import { Route, useHistory, withRouter, useLocation } from 'react-router-dom'
import { useStore } from './stores/helpers/UseStore'
import { observer } from 'mobx-react-lite'

function App() {
  const { dataStore: { auth } } = useStore();

  console.log(auth);

  const data = JSON.parse(localStorage.getItem('data'));

  const location = useLocation();
  const history = useHistory();

  // useEffect(() => {
  //   setName('David');
  //   console.log(location.pathname)
  // }, [])

  useEffect(() => {
    auth.loggedIn = data ? data.loggedIn : false;
    auth.name = data ? data.name : null;
    if (!auth.loggedIn && location.pathname !== '/login') {
      history.push('/login');
    }
    if (location.pathname === '/login' && auth.loggedIn) {
      history.push('/get-someone');
    }
  })

  // const logout = () => {
  //   history.push('/login');
  //   localStorage.removeItem('loggedIn');
  // }
  
  // const login = () => {
  //   localStorage.setItem('loggedIn', true);
  //   history.push('/get-someone');
  // }
  
  return (
    <div id="app">
      {
        !auth.loggedIn ? 
          <Route path="/login" component={() => <Login />} />
          : (
            <React.Fragment>
              <SideNav />
              <div className="main">
                {<TopNav />}
                <div className="component-wrapper">
                  <Route path="/" exact component={ Home } />
                  <Route path="/register" component={ Register } />
                  <Route path="/get-someone" component={ ClaimRewards } />
                  <Route path="/give-someone" component={ GiftFavours } />
                  <Route path="/public-requests" component={ PublicRequests } />
                  <Route path="/leaderboard" component={ Leaderboard } />
                </div>
              </div>
              </React.Fragment>
      )}
      
    </div>
  );
}

export default withRouter(observer(App));
