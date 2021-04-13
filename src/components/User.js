import React, { useState, useEffect } from "react"
import ContractJson from "../contracts/VaccineVerification.json"
import Web3 from "web3"
import {useSmartContract} from "../hooks/LoadContract"

function User() {
    const [account, setAccount] = useState();
    const [recordHash, setRecordHash] = useState("");

    const {retrieveRecord} = useSmartContract();

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

    const retrieveRecordHash = () => {
        console.log(retrieveRecord(account, 10**18))
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