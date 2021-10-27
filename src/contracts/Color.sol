pragma solidity >=0.5.0;

import "./ERC721Full.sol";

contract Color is ERC721Full { 

    address owner;
    string[] public colors;
    mapping(string => bool) colorExists;
    
    constructor() ERC721Full("Color", "COLOR") public {
        owner = msg.sender;
    }

    function mint(string memory _color) public { 
        require(msg.sender == owner, 'owner');
        require(!colorExists[_color], 'color already exists');
        //require unique color 
        uint _index = colors.push(_color);

        //comes from ERC721 (to, id) to mint for real
        _mint(msg.sender, _index);

        colorExists[_color] = true;
        //add color
        // call mint function
        //track 
    }
}