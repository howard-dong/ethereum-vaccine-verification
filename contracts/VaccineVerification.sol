pragma solidity >=0.4.22 <0.9.0;

contract VaccineVerification {

    address payable owner;
    mapping(address => string) public hashes;

    constructor() public {
        owner=msg.sender;
    }

    function storeHash(string memory _hash, address user
    ) public {
//        records[_userAddress].push(
//            Record(_date, _brand, _userAddress, _provider)
//        );
        hashes[user] = _hash;
    }

    function getHash() public payable returns(string memory userHash){
        require(msg.value == 1 ether, "You must pay one ether to access the hash.");
        owner.transfer(msg.value);
        return(hashes[msg.sender]); 
    }

}
