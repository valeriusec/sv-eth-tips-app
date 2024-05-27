// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Tip {
    event NewMemo(
        address indexed from,
        uint timestamp,
        string name,
        string message
    );

    struct Memo {
        address from;
        uint timestamp;
        string name;
        string message;
    }

    address payable owner;
    Memo[] memos;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev fetches all stored memos
     */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    /**
     * @dev buy a coffee for owner (sends an ETH tip and leaves a memo)
     * @param _name name of the tipper
     * @param _message a nice message from the tipper
     */
    function sendTip(
        string memory _name,
        string memory _message
    ) public payable {
        // Must accept more than 0 ETH.
        require(msg.value > 0, "can't send a tip for free!");

        // Add the memo to storage!
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        // Emit a NewMemo event with details about the memo.
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    /**
     * @dev send the entire balance stored in this contract to the owner
     */
    function withdrawTips(address payable withdrawalAddress) public {
        require(msg.sender == owner);
        require(withdrawalAddress.send(address(this).balance));
    }

    /**
     * @dev get the contract owner
     */
    function getOwner() public view returns (address) {
        return owner;
    }

    function changeContractOwner(address newOwner) public {
        require(msg.sender == owner);
        owner = payable(newOwner);
    }
}
