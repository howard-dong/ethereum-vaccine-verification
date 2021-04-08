pragma solidity >=0.4.22 <0.9.0;

contract VaccineVerification {

    mapping(address => string) public hashes;

    constructor() public {}

    function storeHash(string memory _hash, address user) public {
        hashes[user] = _hash;
    }

    function getHash() public view returns(string memory _hashes){
//        require(msg.value == 1 ether, "You must pay one ether to atccess the hash");
        return(hashes[msg.sender]);
    }
}
