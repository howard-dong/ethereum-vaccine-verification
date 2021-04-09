import React, { useState, useEffect } from "react"
import ContractJson from "../contracts/VaccineVerification.json"


function User() {
    const [contract, setContract] = useState();
    const [account, setAccount] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        }
        const web3 = new Web3("http://localhost:7545")
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        setContract(new web3.eth.Contract(ContractJson.abi, ContractJson.networks[5777].address))
    }, [])

    const AccessHash = () => {
        setLoading(true);
        contract.methods.getHash().send({ from: account })
        .once('receipt', (receipt) => {
          setLoading(false);
        })
    }

    return (
        <div></div>
    );
}

export default User;