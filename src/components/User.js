import React, { useState, useEffect } from "react"
import ContractJson from "../contracts/VaccineVerification.json"
import Web3 from "web3"
import { useSmartContract } from "../hooks/LoadContract"
import { Row, Col, Input, Button, Spin } from 'antd';
import 'antd/dist/antd.css';
import './../App.css';

const { BufferList } = require('bl')

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const getFromIPFS = async (hashToGet) => {
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

function User() {
  const [account, setAccount] = useState();
  const [recordHash, setRecordHash] = useState("");
  const [ipfsContents, setIpfsContents] = useState()
  const { retrieveRecord } = useSmartContract();

  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
    const web3 = new Web3("http://localhost:7545")
    const accounts = web3.eth.getAccounts()
    accounts.then(result =>
      setAccount(result[1]))
  }, [])

  const retrieveRecordHash = async () => {
    const hash = await retrieveRecord(account, 10 ** 18)
    setRecordHash(hash);
  }

  const asyncGetFile = async () => {
    let result = await getFromIPFS(recordHash)
    setIpfsContents(result.toString())
  }

  useEffect(() => {
    if (recordHash) asyncGetFile()
  }, [recordHash])

  let ipfsDisplay = ""
  if (recordHash) {
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
    <div>
      <div style={{ padding: 32, textAlign: "left" }}>

        <Button style={{ margin: 8 }} size="large" shape="round" type="primary" onClick={() => {
          retrieveRecordHash()
        }}>
          Get Data
        </Button>

        {recordHash}

        {ipfsDisplay}
        <img 
        src ={'https://ipfs.infura.io/ipfs/' + recordHash}
        />
      </div>
    </div>
  );
}

export default User;