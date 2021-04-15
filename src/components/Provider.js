import './../App.css';
import User from "./User"
import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Spin } from 'antd';
import Web3 from 'web3';
import VaccineJson from "./../contracts/VaccineVerification.json"
import {useSmartContract} from "../hooks/LoadContract"

const { TextArea } = Input;
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

const addToIPFS = async fileToUpload => {
  for await (const result of ipfs.add(fileToUpload)) {
    return result
  }
}

function Provider() {
  const [data, setData] = useState()
  const [sending, setSending] = useState()
  const [loading, setLoading] = useState()
  const [ipfsHash, setIpfsHash] = useState()
  const [ipfsContents, setIpfsContents] = useState()
  const [patientAddress, setPatientAddress] = useState()
  const [account, setAccount] = useState()
  const [buffer, setBuffer] = useState()
  const [recordHash, setRecordHash] = useState("")
  const {addRecord} = useSmartContract()


function captureFile(event){
    event.preventDefault()
    const file  = event.target.files[0]
    const reader = new window.FileReader()
    if (file !=null){
      reader.readAsArrayBuffer(file)
      reader.onloadend = () =>{
        setBuffer(Buffer(reader.result))
        console.log('buffer', buffer)
      }
    }
  }

  async function onSubmit(event){
    event.preventDefault()
    console.log("an attempt was made")
    console.log(buffer)
    const result = await addToIPFS(buffer)
    console.log(result, 'RESULT FILE')
    setIpfsHash(result.path)
  }

  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
    const web3 = new Web3("http://localhost:7545")
    const accounts = web3.eth.getAccounts()
    accounts.then(result =>
      setAccount(result[0]))
  }, [])

  const asyncGetFile = async () => {
    let result = await getFromIPFS(ipfsHash)
    setIpfsContents(result.toString())
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
          addRecord(account, ipfsHash, patientAddress)
        }}>Add this hash on ethereum</Button>
      </div>  
      <form>
        <input type='file' onChange={captureFile}/>
        <button type='submit' onClick={onSubmit}>
          Submit
        </button>
      </form>


    </div>
  );
}

export default Provider;