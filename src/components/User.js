import React, { useState, useEffect } from "react"
import ContractJson from "../contracts/VaccineVerification.json"
import Web3 from "web3"
import { useSmartContract } from "../hooks/LoadContract"
import { Row, Col, Input, Button, Spin } from 'antd';
import 'antd/dist/antd.css';
import './../App.css';
import { CONNECT_BUTTON_CLASSNAME } from "web3modal";

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

  useEffect(() => {
    if (account) {
      retrieveRecordHash()
    }
  }, [account])

  const retrieveRecordHash = async () => {
    console.log(account)
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
  let recordDisplay = ""
  if (recordHash) {
    recordDisplay = (
      <pre style={{ margin: 8, padding: 8, border: "1px solid #dddddd", backgroundColor: "#ededed" }}>
        {recordHash}
      </pre>
    )
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
  } else {
    recordDisplay = (
      <pre style={{ margin: 8, padding: 8, border: "1px solid #dddddd", backgroundColor: "#ededed" }}>
        {"No Hash Found"}
      </pre>
    )
  }

  return (
    <div>
      <div style={{ padding: 32, textAlign: "left" }}>
        IPFS Hash:
        {recordDisplay}
        IPFS Contents:
        {ipfsDisplay}
      </div>
    </div>
  );
}

export default User;