import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

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

function App(){
     const [ data, setData ] = useState()
     const [ sending, setSending ] = useState()
     const [ loading, setLoading ] = useState()
     const [ ipfsHash, setIpfsHash ] = useState()
     const [ ipfsContents, setIpfsContents ] = useState()

     const asyncGetFile = async ()=>{
         let result = await getFromIPFS(ipfsHash)
         setIpfsContents(result.toString())
     }

     useEffect(()=>{
         if(ipfsHash) asyncGetFile()
       },[ipfsHash])

       let ipfsDisplay = ""
       if(ipfsHash){
         if(!ipfsContents){
           ipfsDisplay = (
             <Spin />
           )
         }else{
           ipfsDisplay = (
             <pre style={{margin:8,padding:8,border:"1px solid #dddddd",backgroundColor:"#ededed"}}>
               {ipfsContents}
             </pre>
           )
         }
       }
        return (
            <div className="App">
              <Header />
              <div style={{position:'fixed',textAlign:'right',right:0,top:0,padding:10}}>
              </div>

              <div style={{padding:32,textAlign: "left"}}>
                Enter a bunch of data:
                <TextArea rows={10} value={data} onChange={(e)=>{
                  setData(e.target.value)
                }} />
                <Button style={{margin:8}} loading={sending} size="large" shape="round" type="primary" onClick={async()=>{
                  console.log("UPLOADING...")
                  setSending(true)
                  setIpfsHash()
                  setIpfsContents()
                  const result = await addToIPFS(data)
                  if(result && result.path) {
                    setIpfsHash(result.path)
                  }
                  setSending(false)
                  console.log("RESULT:",result)
                }}>Upload to IPFS</Button>
              </div>

              <div style={{padding:32,textAlign: "left"}}>
                IPFS Hash: <Input value={ipfsHash} onChange={(e)=>{
                  setIpfsHash(e.target.value)
                }} />
                {ipfsDisplay}
             </div>
            </div>
          );
        }


//function App() {
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
//}

export default App;
