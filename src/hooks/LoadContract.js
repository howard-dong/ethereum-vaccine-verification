import Web3 from "web3";
import ContractJson from "../contracts/VaccineVerification.json"

var contract;

var fetched = false;

function getSmartContract() {
    if (!fetched) {
        const web3 = new Web3("http://localhost:7545")
        contract = new web3.eth.Contract(ContractJson.abi, ContractJson.networks[5777].address)
        fetched = true;
    }

    return Promise.resolve(contract)
}

export function useSmartContract() {

    function retrieveRecord(account, amount) {
        // returns contract promise
        getSmartContract().then((c) => {
            c.methods.getHash().send({ from: account, value: amount }).then(
                (result) => {return result}
            )
        })
    }

    function addRecord() {

    }

    return { retrieveRecord, addRecord }
}