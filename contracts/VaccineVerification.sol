pragma solidity >=0.4.22 <0.9.0;

contract VaccineVerification {
    //    uint public taskCount = 0;

    struct Record {
        string date;
        string brand;
        address userAddress;
        address provider;
    }

    mapping(address => Record[]) public records;

    event EmitRecord(
        string date,
        string brand,
        address userAddress,
        address provider
    );

    constructor() public {}

    function createRecord(
        string memory _date,
        string memory _brand,
        address _userAddress,
        address _provider
    ) public {
        records[_userAddress].push(
            Record(_date, _brand, _userAddress, _provider)
        );
        emit EmitRecord(_date, _brand, _userAddress, _provider);
    }

    function accessRecord() public {
        //        if (records[msg.sender] != null) {
        //            //Definitely not the right way to emit it
        //            emit RecordCreated(_date, _type, _userAddress, true);
        //        }
        Record[] memory _userRecords = records[msg.sender];
        for (uint256 i = 0; i < _userRecords.length; i++) {
            emit EmitRecord(
                _userRecords[i].date,
                _userRecords[i].brand,
                _userRecords[i].userAddress,
                _userRecords[i].provider
            );
        }
        // emit RecordAccessed(_userRecords);
        // string memory record_date = _record.date;
        // string memory record_brand = _record.brand;
        // address user_address = _record.userAddress;
        // emit RecordCreated(record_date, record_brand, user_address);
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
