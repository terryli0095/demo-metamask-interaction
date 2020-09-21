import React, { useState } from 'react';
import { testContractInstance, get, set } from './contractFactory'
const Web3 = require('web3');

function ethEnabled() {
  if (window.ethereum) {
    console.log('Ethereum successfully detected!')
    window.ethereum.enable(); // opens pop up that ask you to connect metamask
    return true;
  }
  return false
}
async function getChainID() {
  const chainId = await window.ethereum.request({
    method: 'eth_chainId'
  })
  return chainId;
}



function App() {
  const handleClickSetVal = async (key, val) => {
    console.log(key, val)
    const foo = await set(key, val)
    console.log(foo)
  }
  const handleClickGetVal = async (key) => {
    console.log(key)
    const result = await get(key)
    setOnchaiValue(result)
  }
  ethEnabled()
  const [onchainValue, setOnchaiValue] = useState('')
  const [key, setKey] = useState('')
  const [val, setVal] = useState('')
  return (
    <div >
      <form>
      <label>
          key (address):
        <input type="text" name="key" value={key} onChange={e => setKey(e.target.value)} />
        </label>
        <label>
          val (small integer):
        <input type="number" name="val" value={val} onChange={e => setVal(e.target.value)} />
        </label>
      </form>

      <button onClick={()=> handleClickSetVal(key, val)}>send transaction</button>
      <button onClick={()=> handleClickGetVal(key)}>get value</button>
      <h1>demo</h1>
      <h1> key: {key}</h1>
      <h1> value: {onchainValue}</h1>
    </div>
  );
}

export default App;
