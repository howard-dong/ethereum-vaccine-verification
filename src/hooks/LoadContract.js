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
        getSmartContract().then(c => {
            c.methods.getHash().send({ from: account, value: amount }).then(
                (result) => {return result}
            )
        })
    }

    function addRecord(account, hash, address) {
        getSmartContract().then(c => {
            c.methods.storeHash(hash, address).send({ from: account })
        })
    }

    return { retrieveRecord, addRecord }
}