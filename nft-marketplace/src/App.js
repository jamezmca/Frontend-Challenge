import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ethers } from 'ethers'
import axios from 'axios'
import Web3Modal from 'web3modal'

import Home from "./components/Home";
import MarketPlace from "./components/MarketPlace";
import './App.css'

const contractAddress = '0xDb172Cf85521EBA2d825C4DD5824ef878696Ee05'



function App() {




  return (
    <Router>
      <div>
        <nav >
          <ul className="navbar">
            <li>
              <Link to="/">Create NFT</Link>
            </li>
            <li>
              <Link to="/marketplace">Market Place</Link>
            </li>
          </ul>
        </nav>


        <Switch>
          <Route path="/marketplace">
            <MarketPlace />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
