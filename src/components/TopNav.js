import React from 'react'
import './TopNav.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

class Home extends React.Component {
  render = () =>
    <div id="topnav">
      <div className="notifications">
        <FontAwesomeIcon icon={faBell} />
      </div>
      <div className="profile">
        <img src="/displaypic.png" alt=""/>
        <span>David Bragg <FontAwesomeIcon icon={faCaretDown} /></span>
      </div>
    </div>
}

export default Home