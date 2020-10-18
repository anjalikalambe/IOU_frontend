import React, { useState } from 'react';
import HomeNav from '../components/HomeNav';
import './Home.scss'
import { observer } from 'mobx-react-lite';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Home = () => {
  let history = useHistory();
  let location = useLocation();

  return (
    <div className="flex flex-col" id="Home">
      <HomeNav />
      <section id="landing-page">
        <div className="content-wrapper flex-col align-center justify-center" style={{position:'relative'}}>
          <div className="flex flex-col align-center" style={{zIndex: 10, backgroundColor: '#fff'}}>
              <h1>UTS' highest rated online favour platform</h1>
              <h2>
                start receiving favours with&nbsp;
                <span style={{color: '#6030b1'}}>IOU</span> today
              </h2>
          </div>
          <div>
            <img src="/building.png" alt="building" className="building" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default observer(Home);
