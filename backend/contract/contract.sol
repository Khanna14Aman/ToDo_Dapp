// SPDX-License-Identifier:GPL-3.0

pragma solidity >=0.5.0 <0.9.0;
contract ToDo{
    struct List{
        string name;
        string date;
    }
    address public owner;
    constructor(){
        owner = msg.sender;
    }
    uint public id=1;
    mapping(uint=>List) public AllTasks;
    function create(string calldata _name,string calldata _date)public{
        require(msg.sender==owner,"Only onwer of this contract can use this");
        AllTasks[id]=List(_name,_date);
        id++;
    }
    function update(uint _id,string calldata _name,string calldata _date)public{
        require(msg.sender==owner,"Only owner of this contract can use this");
        require(_id>0 && _id<id,"You have provided wrong ID to update data");
        AllTasks[_id]=List(_name,_date);
    }
    function deleteTask(uint _id)public{
        require(msg.sender==owner,"Only owner of this contract can use this");
        require(_id>0 && _id<id,"You have provided wrong ID to Delete Data");
        delete AllTasks[_id];
    }
    function viewTask()view public returns(List[] memory){
        List[] memory arr = new List[](id-1);
        for(uint i=0;i<id-1;i++){
            arr[i] = AllTasks[i+1];
        }
        return arr;
    }
}