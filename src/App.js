import React from 'react'
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
import { Route } from 'react-router-dom'

function App() {
  return (
    <div id="app">
      <SideNav />
      <div className="main">
        <TopNav />
        <div className="component-wrapper">
          <Route path="/" exact component={ Home } />
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/get-someone" component={ ClaimRewards } />
          <Route path="/give-someone" component={ GiftFavours } />
          <Route path="/public-requests" component={ PublicRequests } />
          <Route path="/leaderboard" component={ Leaderboard } />
        </div>
      </div>

    </div>
  );
}

export default App;
