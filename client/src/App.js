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
      const web3 = await getWeb3('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
      // const web3 = await getWeb3('http://localhost:3000');

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // const deployedNetwork = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"//NFTFarm.networks[networkId];
      // const deployedNetwork = "rinkeby"//NFTFarm.networks[networkId];
      const deployedNetwork = "rinkeby"//NFTFarm.networks[networkId];
      const contractAddress = "0xDb172Cf85521EBA2d825C4DD5824ef878696Ee05"//NFTFarm.networks[networkId];
      const instance = new web3.eth.Contract(
        NFTFarm.abi,
        deployedNetwork && contractAddress,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3)
      setAccounts(accounts)
      setContract(() => instance)
      console.log('hello', accounts)
      console.log('spanky', instance)
      console.log('web3',web3)
      console.log('web3', await web3.eth.getChainId())
    
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  })()},[]);

  useEffect(() => {
    async function getAllFighters() {
      // Stores a given value, 5 by default.

      // Get the value from the contract to prove it worked.
      const response = await contract.methods.getNumberOfNFTs().call()
      const response2 = await contract.methods.totalSupply().call()
      const response3 = await contract.methods.tokens('cool')
      console.log('hi', response3)
      setStorageValue(response)
    }
    if (contract && accounts) {
      getAllFighters()
    }
  }, [contract, accounts])
  

  async function mintNFT(e) {
    e.preventDefault()
    console.log('minting...', accounts[0])
    
    await contract.methods.createRandomFighter(accounts[0])
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

