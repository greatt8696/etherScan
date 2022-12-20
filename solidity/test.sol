// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Test {
    event Mint(address indexed minter, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    mapping(address => uint256) _balance;

    constructor() {
        mint(100000000000000);
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balance[account];
    }

    function mint(uint256 amount) public {
        _balance[msg.sender] += amount;
        emit Mint(msg.sender, amount);
    }

    function transfer(address to, uint256 amount) public {
        _balance[msg.sender] -= amount;
        _balance[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }
}
