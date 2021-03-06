pragma solidity >=0.5.0;

// the lottery will have manager that

contract Lottery {
    address payable[] public players; //accessed by anyone
    address public manager;
    uint256[] public lol;

    constructor() public {
        manager = msg.sender;
    }

    // receive() external payable {
    //     require(msg.value > 0.1 ether, "value not right");
    // players.push(payable(msg.sender)); //needs to convert before pushing to payable array
    // }

    function deposit() public payable {
        lol.push(1);
    }

    function getBalance() public view returns (uint256) {
        require(msg.sender == manager, "No permission");
        return address(this).balance;
    }

    function random() public view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        players.length
                    )
                )
            );
    }

    function pickWinner() public {
        require(msg.sender == manager, "GTO!");
        require(players.length >= 3, "Not enough player participaing");

        uint256 rand = random();
        address payable winner;
        uint256 index = rand % players.length;

        winner = players[index];
        winner.transfer(getBalance());
        players = new address payable[](0); //reset lottery
    }
}
