# Etereum Vaccine Verification App

This application utilizes Blockchain and IPFS to store vaccine verification records (as images). Records that are uploaded to the IPFS will have an associating hash, which is then stored within the blockchain through the smart contract and is directly linked to the user's account. If a user wishes to access a record, a transaction must be sent to the smawrt contract and its result will be the hash associated with the vaccination record, which can be revealed through the IPFS. 

## Getting Started

Before starting, a network (or testing network) must be set up matching the config files. Through ganashe, the truffle config file can be selected as the target project in the ganache settings. This way, the smart contract will be dwployed onto the ganache test network to simulate the application.

To get the application started, the following commands must be run.

"truffle migrate"
"npm start"

These commands allow truffle to compile and connect the application to the set up network and then open up the application interface.

