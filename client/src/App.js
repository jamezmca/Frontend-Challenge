import React, { useState, useEffect } from "react";
import NFTFarm from "./contracts/NFTFarm.json";
import getWeb3 from "./getWeb3";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./App.css";
import Store from "./components/Store";
import Home from "./components/Home";

export default function App() {
  const [storageValue, setStorageValue] = useState(0)
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    ;(async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = 0xDb172Cf85521EBA2d825C4DD5824ef878696Ee05//NFTFarm.networks[networkId];
      const instance = new web3.eth.Contract(
        NFTFarm.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3)
      setAccounts(accounts)
      setContract(() => instance)
      console.log('hello', accounts)
      console.log('hi', instance)

    
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  })()},[]);

  useEffect(() => {
    async function runExample() {
      // Stores a given value, 5 by default.
      console.log(accounts)
      await contract.methods.set(5).send({ from: accounts[0] });
  
      // Get the value from the contract to prove it worked.
      const response = await contract.methods.get().call();
  
      setStorageValue(response)
    }
    if (contract && accounts) {
      runExample()
    }
   
  }, [contract, accounts])
  

  async function mintNFT(e) {
    e.preventDefault()
    console.log('minting...')
    // await contract.methods.
  }

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <ul>
            <li >
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/store">Store</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/store">
            <Store />
          </Route>

          <Route path="/">
            <Home mintNFT={mintNFT}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );

}

