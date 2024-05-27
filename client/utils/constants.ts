export const contractAddressConstant = "0x66BfB126ad6997Efb651D00689f516772e7362Ba"

export const contractCodeString = `
    // SPDX-License-Identifier: UNLICENSED
    
    pragma solidity ^0.8.24;
    
    // Define a new contract named 'Tip'.
    contract Tip {
    
        // Event to emit a new memo when a tip is sent.
        event NewMemo(
            address indexed from,
            uint timestamp,
            string name,
            string message
        );
    
        // Struct to define the structure of a memo.
        struct Memo {
            address from;
            uint timestamp;
            string name;
            string message;
        }
    
        // State variables: owner (the contract owner) and memos (an array to store all memos).
        address payable owner;
        Memo[] memos;
    
        // Constructor to initialize the contract. Sets the owner to the address that deploys the contract.
        constructor() {
            owner = payable(msg.sender);
        }
    
        // Function to fetch all stored memos. It returns an array of Memo structs.
        function getMemos() public view returns (Memo[] memory) {
            return memos;
        }
    
        // Function to send a tip. Requires a non-zero ETH value.
        function sendTip(
            string memory _name,
            string memory _message
        ) public payable {
            require(msg.value > 0);
            
            // Adds the memo to the storage array.
            memos.push(Memo(msg.sender, block.timestamp, _name, _message));
    
            // Emits the NewMemo event with details about the memo.
            emit NewMemo(msg.sender, block.timestamp, _name, _message);
        }
    
        // Function to withdraw all tips. Only the owner can withdraw. Sends the contract balance to the specified address.
        function withdrawTips(address payable withdrawalAddress) public {
            require(msg.sender == owner);
            require(withdrawalAddress.send(address(this).balance));
        }
    
        // Function to get the contract owner.
        function getOwner() public view returns (address) {
            return owner;
        }
    
        // Function to change the contract owner. Only the current owner can change it.
        function changeContractOwner(address newOwner) public {
            require(msg.sender == owner);
            owner = payable(newOwner);
        }
    }
    `;

export const techs = [
    {
      name: "Next.js",
      logo: "/images/nextjs.svg",
    },
    {
      name: "Hardhat",
      logo: "/images/hardhat.svg",
    },
    {
      name: "Ethers.js",
      logo: "/images/ethers.svg",
    },
    {
      name: "Solidity",
      logo: "/images/solidity.svg",
    },
    {
      name: "Shadcn/ui",
      logo: "/images/shadcn.png",
    },
    {
      name: "Tailwind Css",
      logo: "/images/tailwind.svg",
    },
  ];

export const socials = [
    {
        name: "Github",
        logo: "/images/github.svg",
        link: "https://github.com/valeriusec"
    },
    {
        name: "Instagram",
        logo: "/images/instagram.svg",
        link: "https://www.instagram.com/valeriu_code/"
    },
    {
        name: "X",
        logo: "/images/x.svg",
        link: "https://x.com/SecrieruValeriu"
    },
    {
        name: "Tiktok",
        logo: "/images/tiktok.svg",
        link: "https://www.tiktok.com/@valeriu_code"
    }
]