import React from 'react'
import './App.scss'
import TopNav from './components/TopNav.js'
import SideNav from './components/SideNav.js'
import Home from './components/Home.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import GetSomeone from './components/GetSomeone.js'
import GiveSomeone from './components/GiveSomeone.js'
import PublicRequests from './components/PublicRequests.js'
import Leaderboard from './components/Leaderboard.js'
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
          <Route path="/get-someone" component={ GetSomeone } />
          <Route path="/give-someone" component={ GiveSomeone } />
          <Route path="/public-requests" component={ PublicRequests } />
          <Route path="/leaderboard" component={ Leaderboard } />
        </div>
      </div>

    </div>
  );
}

export default App;
