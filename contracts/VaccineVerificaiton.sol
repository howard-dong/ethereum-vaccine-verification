pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    //    uint public taskCount = 0;
    address owner;
    address provider;

    struct record {
        string date;
        string type;
        string userAddress;
        bool completed;
    }

    mapping(userAddress => record) public records;


    event TaskCompleted (
        string date,
        string type,
        string userAddress,
        bool completed
    );

    constructor()  {
        owner = msg.sender;
        //        provider = random;
    }



    function createRecord(string memory _date, string memory _type, string memory _userAddress) public {
        //        require(msg.sender == owner);
        records[_userAddress] = record(_date, _type, _userAddress, true);
        emit RecordCreated(_date, _type, _userAddress, true);
    }

    function accessRecord(string memory _userAddress) {
        require(msg.sender == owner);
        if (records[_address] != null) {
            //Definitely not the right way to emit it
            emit RecordCreated(_date, _type, _userAddress, true);
        }
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