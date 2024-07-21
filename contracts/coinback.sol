// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Coinback {
    struct User {
        string id;
        string name;
        string cpf;
        uint256 cashback;
        bool exists;
        string pass;
    }

    struct Purchase {
        string id;
        address user;
        string productName;
        uint256 value;
    }

    // mapping(address => User) public users;
    // mapping(string => string) private userIds;
    Purchase[] public purchases;

    mapping(address => User) private users;
    mapping(string => address) private userAddresses; // Mapeia CPF para endereço

    address public owner;
    uint256 public commissionPercent = 10;
    uint256 public cashbackPercent = 10;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // function addUser(string memory id, string memory _name, string memory _cpf, string memory _pass) public {
    //     require(!users[msg.sender].exists, "User already exists");
    //     users[msg.sender] = User(id, _name, _cpf, 0, true, _pass);
    // }

    // function getUserIdByCPF(string memory cpf) public view returns (string memory) {
    //     return userIds[cpf];
    // }

    function registerUser(string memory cpf, string memory id, string memory name, string memory pass) public {
        address userAddress = msg.sender; 
        users[userAddress] = User(id, name, cpf, 0, true, pass);
        userAddresses[cpf] = userAddress;
    }

    function getUserAddressByCPF(string memory cpf) public view returns (address) {
        return userAddresses[cpf];
    }

    function getUserByAddress(address userAddress) public view returns (string memory, string memory, string memory, uint) {
        User memory user = users[userAddress];
        return (user.id, user.name, user.pass, user.cashback);
    }

    function makePurchase(string memory _id, string memory _productName, uint256 _value) public {
        require(users[msg.sender].exists, "User does not exist");
        
        uint256 cashback = (_value * commissionPercent * cashbackPercent) / 10000;
        users[msg.sender].cashback += cashback;
        
        purchases.push(Purchase(_id, msg.sender, _productName, _value));
    }

    function getPurchases() public view returns (Purchase[] memory) {
        return purchases;
    }

    function getUser(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }
}