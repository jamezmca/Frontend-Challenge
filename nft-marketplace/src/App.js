import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ethers } from 'ethers'
import axios from 'axios'
import Web3Modal, { Provider } from 'web3modal'

import Home from "./components/Home";
import MarketPlace from "./components/MarketPlace";
import './App.css'

import NFTFarm from './NFTFarm.json'
const contractAddress = '0xDb172Cf85521EBA2d825C4DD5824ef878696Ee05'



function App() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState(true)
  const [tokensTotal, setTokensTotal] = useState()
  
  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(contractAddress, NFTFarm.abi, provider)
    const hello = await contract.getNumberOfNFTs()
    console.log(contract)
  }

  console.log(tokensTotal)
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
            <Home tokensTotal={tokensTotal}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
