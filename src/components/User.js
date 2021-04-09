import React, { useState, useEffect } from "react"
import ContractJson from "../contracts/VaccineVerification.json"
import Web3 from "web3";

function User() {
    const [contract, setContract] = useState();
    const [account, setAccount] = useState();
    const [recordHash, setRecordHash] = useState("");

    useEffect(() => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        }
        const web3 = new Web3("http://localhost:7545")
        const accounts = web3.eth.getAccounts()
        accounts.then(result =>
            setAccount(result[0]))
        setContract(new web3.eth.Contract(ContractJson.abi, ContractJson.networks[5777].address))
    }, [])

    const retrieveRecordHash = () => {
        contract.methods.getHash().send({ from: account, value: 10**18 }).then(setRecordHash)
    }

    return (
        <div>
            <button onClick={retrieveRecordHash}>
                Get Hash
            </button>

        </div>
    );
}

export default User;