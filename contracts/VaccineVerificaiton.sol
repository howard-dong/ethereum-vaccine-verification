pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    //    uint public taskCount = 0;
    address provider;

    struct record {
        string date;
        string brand;
        address userAddress;
    }

    mapping(address => record) public records;


    event RecordCreated (
        string date,
        string brand,
        address userAddress
    );

    constructor() public{
        provider = msg.sender;
        //        provider = random;
    }



    function createRecord(string memory _date, string memory _brand, address _userAddress) public {
        require(msg.sender == provider);
        records[_userAddress] = record(_date, _brand, _userAddress);
//        emit RecordCreated(_date, _type, _userAddress, true);
    }

    function accessRecord() public{
//        if (records[msg.sender] != null) {
//            //Definitely not the right way to emit it
//            emit RecordCreated(_date, _type, _userAddress, true);
//        }
        record memory _record = records[msg.sender];
        string memory record_date = _record.date;
        string memory record_brand = _record.brand;
        address user_address = _record.userAddress;
        emit RecordCreated(record_date, record_brand, user_address);
    }

    //    function toggleCompleted(uint _id) public {
    //        string memory _content = "And here you go again :p";
    //        Task memory _task = tasks[_id];
    //        _task.completed = !_task.completed;
    //        tasks[_id] = _task;
    //        if(_task.completed) {
    //            createTask(_content);
    //        }
    //        emit TaskCompleted(_id, _task.completed);
    //    }
}