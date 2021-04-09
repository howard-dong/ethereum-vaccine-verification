import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Spin } from 'antd';
import Web3 from 'web3';
import VaccineJson from "./contracts/VaccineVerification.json"

const { TextArea } = Input;
const { BufferList } = require('bl')


const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const getFromIPFS = async hashToGet => {
  for await (const file of ipfs.get(hashToGet)) {
    console.log(file.path)
    if (!file.content) continue;
    const content = new BufferList()
    for await (const chunk of file.content) {
      content.append(chunk)
    }
    console.log(content)
    return content
  }
}

const addToIPFS = async fileToUpload => {
  for await (const result of ipfs.add(fileToUpload)) {
    return result
  }
}

function App() {
  const [data, setData] = useState()
  const [sending, setSending] = useState()
  const [loading, setLoading] = useState()
  const [ipfsHash, setIpfsHash] = useState()
  const [ipfsContents, setIpfsContents] = useState()
  const [patientAddress, setPatientAddress] = useState()
  const [account, setAccount] = useState();


  const [contract, setContract] = useState();
  //  const [account, setAccount] = useState();
  const [recordHash, setRecordHash] = useState("");

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const loadBlockchainData = async () =>{
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
    const web3 = new Web3("http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    // setAccount(accounts[1])
    // console.log(account)
    setContract(new web3.eth.Contract(VaccineJson.abi, VaccineJson.networks[5777].address))
  }
  //  useEffect(() => {
  //   loadweb3()
  //   loadBlockchainData()
  // })

  // const loadweb3 = async () => {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum)
  //     await window.ethereum.enable()
  //   }
  //   else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider)
  //   }
  //   else {
  //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  //   }
  // }    

  // const loadBlockchainData = async () => {
  //   const web3 = window.web3
  //   const accounts = await web3.eth.getAccounts()
  //   console.log(accounts)
  //   const networkId = await web3.eth.net.getId()
  //   console.log(networkId)
  // }

  const asyncGetFile = async () => {
    let result = await getFromIPFS(ipfsHash)
    setIpfsContents(result.toString())
  }

  const storeHashRecords = () => {
    contract.methods.storeHash(ipfsHash, patientAddress).send({ from: account }).then((r) =>{})
  }


  useEffect(() => {
    if (ipfsHash) asyncGetFile()
  }, [ipfsHash])

  let ipfsDisplay = ""
  if (ipfsHash) {
    if (!ipfsContents) {
      ipfsDisplay = (
        <Spin />
      )
    } else {
      ipfsDisplay = (
        <pre style={{ margin: 8, padding: 8, border: "1px solid #dddddd", backgroundColor: "#ededed" }}>
          {ipfsContents}
        </pre>
      )
    }
  }
  return (
    <div className="App">
      <div style={{ position: 'fixed', textAlign: 'right', right: 0, top: 0, padding: 10 }}>
      </div>

      <div style={{ padding: 32, textAlign: "left" }}>
        Enter a bunch of data:
                <TextArea rows={10} value={data} onChange={(e) => {
          setData(e.target.value)
        }} />
        <Button style={{ margin: 8 }} loading={sending} size="large" shape="round" type="primary" onClick={async () => {
          console.log("UPLOADING...")
          setSending(true)
          setIpfsHash()
          setIpfsContents()
          const result = await addToIPFS(data)
          if (result && result.path) {
            setIpfsHash(result.path)
          }
          setSending(false)
          console.log("RESULT:", result)
        }}>Upload to IPFS</Button>
      </div>

      <div style={{ padding: 32, textAlign: "left" }}>
        Enter Patient Address:
          <TextArea rows={1} value={patientAddress} onChange={(e) => {
          setPatientAddress(e.target.value)
        }} />

        <Button style={{ margin: 8 }} size="large" shape="round" type="primary" onClick={() => {
          alert(patientAddress);
        }}>
          Add Patient Address
        </Button>
      </div>

      <div style={{ padding: 32, textAlign: "left" }}>
        IPFS Hash: <Input value={ipfsHash} onChange={(e) => {
          setIpfsHash(e.target.value)
        }} />
        {ipfsDisplay}

        <Button disabled={!ipfsHash} style={{ margin: 8 }} size="large" shape="round" type="primary" onClick={async () => {
          storeHashRecords(ipfsHash, patientAddress)
        }}>Add this hash on ethereum</Button>
      </div>

      {/* <div style={{padding:32,textAlign: "left"}}>
        {attestationDisplay}
      </div> */}

    </div>
  );
}


// function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
// }

export default App;
